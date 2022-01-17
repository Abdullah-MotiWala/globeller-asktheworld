let reportName = location.href.split("=")[1].split("?")[0];
let userName = location.href.split("=")[2];
let ansDiv = document.querySelector(".ansDet");
let userHead = document.querySelector(".userHead");
let answers;
//FIREBASE FUN 1: getting questions doc
const getReports = () => {
  document.querySelector(".userHead").innerText = `Answers of ${userName}`;
  firestore
    .collection("reports")
    .where("reportName", "==", reportName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        answers = doc.data().answers;
        ansDiv.innerHTML = " ";
        getAns(answers);
      });
    });
};
getReports();

//looping asnwer for getting through name
const getAns = (ansArr) => {
  ansArr.forEach((ansObj) => {
    let userObjName = ansObj.userObj.name.split(" ").join("");
    if (userName == userObjName) {
      ansDet(ansObj);
    }
  });
};

const ansDet = (obj) => {
  for (let qType in obj) {
    if (qType != "userObj") {
      obj[qType].forEach((qNO) => {
        //div for questions
        let queDiv = eleCreator("div");
        queDiv.classList.add("queAnsDet");

        //   div for answer
        let qResDiv = eleCreator("div");
        qResDiv.classList.add("repAns");

        answer(qNO, queDiv, qResDiv, qType);
        childAppendFun(queDiv, qResDiv);
        childAppendFun(ansDiv, queDiv);
      });
    }
  }
};
//answer funciton fro differernt Type qustions
const answer = (qNo, qParent, aParent, qType) => {
  // question
  let qText = document.createTextNode(qNo.q);
  childAppendFun(qParent, qText);
  //answers
  let txt = qNo.qResult;

  if (qType == "multiArrAns") {
    txt = `${qNo.qResult} \n Chosen Option : ${qNo.chosenOpt}`;
  }
  let ansText = document.createTextNode(txt);
  childAppendFun(aParent, ansText);
};
const eleCreator = (ele) => document.createElement(ele);
const childAppendFun = (parent, child) => parent.appendChild(child);
