const loginStatus = document.querySelector(".loginStatus");
const quesDiv = document.querySelector(".quesAdd");
const quesBtn = document.querySelector(".qBtn");
let arr = [1, 2, 3];
let qType;
let qNo = 0;

//arr to send on firestore
let singleArr = [];
let multiArr = [];
let dataArr = [];
let quesObj = {
  singleArr,
  multiArr,
  dataArr
};
let singleQueObj = {};

quesBtn.addEventListener("click", () => {
  addQue();
});

//MAIN FUNC 1:sending to db function
const sendingToDb = () => {
  createDBObj();
  saveInDb(quesObj);
};

//MAIN FUNC 2: adding questions
const addQue = () => {
  queDetailDiv = document.createElement("div");
  queDetailDiv.setAttribute("class", "questionDiv");
  let quesType = document.querySelector("input[name='qType']:checked").value;
  createQue(quesType)
}

//FIREBAE FUNC 1:authStateChange
auth.onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    document.querySelector(".loginStatus").innerHTML = user.email;
    quesObj.author = user.email;
    // ...
  } else {
    document.querySelector(".loginStatus").innerHTML = "Not Logged In";
  }
});

//FIREBAE FUNC 2:signUp Function
const signUp = () => {
  let userEmail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;
  auth
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((userCred) => {
      const user = userCred.user;
      alert("Sign Up SuccessFully");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      console.log(user.email);
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

//FIREBAE FUNC 3:Sign In function
const signIn = () => {
  let userEmail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;
  auth
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((userCred) => {
      const userName = userCred.user;
      alert("Sign In SuccessFully");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      console.log(user.email);
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

//FIREBAE FUNC 4:Logout Function
const logOut = () => {
  auth
    .signOut()
    .then(() => {
      alert("Log out...");
    })
    .catch((error) => {
      alert(error.message);
    });
};



//DATABASE FUNC 1(): creating obj for db
const createDBObj = () => {
  const questions = quesDiv.children;
  for (let i = 0; i < questions.length; i++) {

    //sending single question to db
    if (questions[i].classList.contains(`single${i}`)) {
      singleArr.push({
        q: document.querySelector(`.singleqBar${i}`).value,
        isTrue: document.querySelector(`input[name = single${i}]:checked`).value ==
          "true"
      });
    }

    //dataQuestion to Db
    else if (questions[i].classList.contains(`data${i}`)) {
      dataArr.push({
        q: document.querySelector(`.dataqBar${i}`).value
      });
    }

    //multiQuestion to Db
    else if (questions[i].classList.contains(`multi${i}`)) {
      console.log(document.querySelector(`.ulForOpt${0}`).children)
      let optionsUl = document.querySelector(`.ulForOpt${i}`).children;
      let options = [];
      for (let i = 0; i < optionsUl.length; i++) {
        options.push(optionsUl[i].firstElementChild.value);
      }
      multiArr.push({
        q: document.querySelector(`.multiqBar${i}`).value,
        options,
        correct: document.querySelector(`input[name=multi${i}]:checked`).value
      });
    }
  }
};

//DATABASE FUNC 2(database):adding obj to database
const saveInDb = (obj) => {
  // saving in DB
  firestore
    .collection("reports")
    .doc(uid)
    .set(obj)
    .then(() => {
      alert("Report saved");
    })
    .catch((error) => {
      alert("Error writing document: ", error);
    });
};


//DOM FUNCTION 1: creating question 
const createQue = (qType) => {
  //creating Questions
  qBar = document.createElement("input");
  qBar.setAttribute("name", `${qType}${qNo}`);
  qBar.setAttribute("class", `${qType}qBar${qNo}`);

  queDetailDiv.classList.add(`${qType}${qNo}`);
  queDetailDiv.classList.add(qType);
 

  if (qType == 'single') {
    creRad(['true', 'false']);
  }
  if (qType == 'multi') {
    console.log(qType);
    queDetailDiv.appendChild(creUl(qType));
  }

  quesDiv.appendChild(queDetailDiv);
  queDetailDiv.appendChild(qBar);
  qNo++;
}


//DOM FUNCTION 2: creating Radio for single Questions 
const creRad = (opt) => {
  for (let i = 0; i < opt.length; i++) {
    let textNode = document.createTextNode(opt[i]);
    let creLabel = document.createElement("label");
    let createRad = document.createElement("input");
    createRad.setAttribute("type", "radio");
    createRad.setAttribute("name", `single${qNo}`);
    createRad.setAttribute("value", opt[i]);
    if (i == 0) {
      createRad.setAttribute("checked", "checked");
    }
    creLabel.appendChild(textNode);
    creLabel.appendChild(createRad);
    //appending to question bar
    queDetailDiv.appendChild(creLabel);
  }
}

// DOM FUCNTION 3: creating ul for multi Questions
const creUl = (type) => {
  console.log(type)
  //creating ul for options
  let ulForOpt = document.createElement("ul");
  ulForOpt.setAttribute("class", `ulForOpt${qNo}`);
  let options = prompt("Enter the no. of options");
  for (let i = 0; i < options; i++) {
    // creating li options
    let liForOpt = document.createElement("li");
    liForOpt.setAttribute("class", `liOpt${qNo}`);
    textForOpt = document.createElement("input");
    textForOpt.setAttribute("name", "txtOpts");
    let checkCorrect = document.createElement("input");
    checkCorrect.setAttribute("type", "radio");
    checkCorrect.setAttribute("name", `${type}${qNo}`);
    checkCorrect.setAttribute("value", i);

    liForOpt.appendChild(textForOpt);
    liForOpt.appendChild(checkCorrect);
    // appending to ul
    ulForOpt.appendChild(liForOpt);
  }
  return ulForOpt
}