const loginStatus = document.querySelector(".loginStatus");
const quesDiv = document.querySelector(".addQues");
const quesBtn = document.querySelector(".qBtn");

let qType;

quesBtn.addEventListener("click", () => {
  addQue();
});

//saving in DB
db.collection("cities")
  .doc("LA")
  .set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  })
  .then(() => {
    console.log("Document successfully written!");
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
//

//MAIN FUNC 1:sending to db function
const sendingToDb = () => {
  // question
  const ques = document.querySelector(".qBar").value;
  //   prepairing single questions
  if (qType === "single") {
    let optTrue = document.querySelector("input[name='qRad']:checked");

    // sending Array of single questions
    let dataSend = [ques, optTrue];
    return dataSend;
  }

  //   prepairing multi questions
  else if (qType === "multi") {
    // multi choice question options object
    txtOptObj = {};
    //text options
    let txtOpts = document.getElementsByName("txtOpts");
    for (let i = 0; i < txtOpts.length; i++) {
      txtOptObj[`opt${i}`] = txtOpts[i];
    }
    //correct checked option
    let checkedOpt = document.querySelector("input[name='corOpts']:checked");
    // sendig Array of multi questions
    let dataSend = [ques, txtOptObj, checkedOpt];
    return dataSend;
  }

  return [ques, "data"];
};

//MAIN FUNC 2: adding questions
const addQue = () => {
  let radArr = document.querySelector("input[name='qType']:checked").value;

  //creating save btn
  let saveBtn = document.createElement("button");
  let btnText = document.createTextNode("Save");
  saveBtn.appendChild(btnText);

  //creating question Bar
  let qBar = document.createElement("input");
  qBar.setAttribute("name", "qBar");
  qBar.setAttribute("class", "qBar");
  quesDiv.appendChild(qBar, saveBtn);
  quesDiv.appendChild(saveBtn);

  // data type question
  if (radArr === "data") {
    qType = "data";
  } //single question
  else if (radArr === "single") {
    qType = "single";
    let opt = ["true", "false"];
    //creating radio btns for true & false (single questions)
    for (let i = 0; i < opt.length; i++) {
      let textNode = document.createTextNode(opt[i]);
      let creLabel = document.createElement("label");
      let createRad = document.createElement("input");
      createRad.setAttribute("type", "radio");
      createRad.setAttribute("name", "qRad");
      createRad.setAttribute("value", opt[i]);
      creLabel.appendChild(textNode);
      creLabel.appendChild(createRad);
      //appending to question bar
      quesDiv.appendChild(creLabel);
    }
  }
  //multiple questions
  else if (radArr === "multi") {
    qType = "multi";
    //creating ul for options
    let ulForOpt = document.createElement("ul");
    let options = prompt("Enter the no. of options");
    for (let i = 0; i < options; i++) {
      // creating li options
      let liForOpt = document.createElement("li");
      textForOpt = document.createElement("input");
      textForOpt.setAttribute("name", "txtOpts");
      let checkCorrect = document.createElement("input");
      checkCorrect.setAttribute("type", "radio");
      checkCorrect.setAttribute("name", "corOpts");
      checkCorrect.setAttribute("value", i + 1);

      liForOpt.appendChild(textForOpt);
      liForOpt.appendChild(checkCorrect);
      // appending to ul
      ulForOpt.appendChild(liForOpt);
    }
    //appending to question bar
    quesDiv.appendChild(ulForOpt);
  }
};

//FIREBAE FUNC 1:authStateChange
auth.onAuthStateChanged((user) => {
  if (user) {
    let uid = user.uid;
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
    .signInWithEmailAndPassword("a@c1.com", "123456")
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
