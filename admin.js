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
let quesObj = { singleArr, multiArr, dataArr };
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
  let radArr = document.querySelector("input[name='qType']:checked").value;

  //creating save btn
  let saveBtn = document.createElement("button");
  let btnText = document.createTextNode("Save");
  saveBtn.appendChild(btnText);

  //creating question Bar

  // data type question
  if (radArr === "data") {
    qType = "data";
    qBar = document.createElement("input");
    qBar.setAttribute("name", `data${qNo}`);
    qBar.setAttribute("class", `dataqBar${qNo}`);

    queDetailDiv.classList.add(`data${qNo}`);
    queDetailDiv.classList.add(`data`);
    qNo++;
  } //single question
  else if (radArr === "single") {
    qBar = document.createElement("input");
    qBar.setAttribute("name", `single${qNo}`);
    qBar.setAttribute("class", `singleqBar${qNo}`);

    queDetailDiv.classList.add(`single${qNo}`);
    queDetailDiv.classList.add(`single`);

    qType = "single";
    let opt = ["true", "false"];
    //creating radio btns for true & false (single questions)
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
    qNo++;
  }
  //multiple questions
  else if (radArr === "multi") {
    qBar = document.createElement("input");
    qBar.setAttribute("name", `multi${qNo}`);
    qBar.setAttribute("class", `multiqBar${qNo}`);

    queDetailDiv.classList.add(`multi${qNo}`);
    queDetailDiv.classList.add(`multi`);
    qType = "multi";
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
      checkCorrect.setAttribute("name", `multi${qNo}`);
      checkCorrect.setAttribute("value", i);

      liForOpt.appendChild(textForOpt);
      liForOpt.appendChild(checkCorrect);
      // appending to ul
      ulForOpt.appendChild(liForOpt);
    }
    //appending to question bar
    queDetailDiv.appendChild(ulForOpt);
    qNo++;
  }
  quesDiv.appendChild(queDetailDiv);
  queDetailDiv.appendChild(qBar);
  queDetailDiv.appendChild(saveBtn);
  // sendingToDb();
};

//FIREBAE FUNC 1:authStateChange
auth.onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    document.querySelector(".loginStatus").innerHTML = user.email;
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
  console.log(userEmail, userPassword);
  auth
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((userCred) => {
      const user = userCred.user;
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
    console.log(questions[i]);
    //sending single question to db
    if (questions[i].classList.contains(`single${i}`)) {
      singleArr.push({
        q: document.querySelector(`.singleqBar${i}`).value,
        isTrue:
          document.querySelector(`input[name = single${i}]:checked`).value ==
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
