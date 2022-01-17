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
        // let ansDoc = doc.data().answers;
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
  console.log(obj);
  for (let qType in obj) {
    // console.log(qType == "userObj");

    if (qType != "userObj") {
      obj[qType].forEach((qNO) => {
        console.log(obj[qType]);
        //div for questions
        let queDiv = eleCreator("div");
        queDiv.classList.add("queAnsDet");

        //   div for answer
        let qResDiv = eleCreator("div");
        qResDiv.classList.add("repAns");

        answer(qNO, queDiv, qResDiv, qType);
        childAppendFun(queDiv, qResDiv);
        childAppendFun(ansDiv, queDiv);
        console.log(queDiv);
      });
      // }
    }
  }
};
//answer funciton fro differernt Type qustions
const answer = (qNo, qParent, aParent, qType) => {
  // question
  let qText = document.createTextNode(qNo.q);
  childAppendFun(qParent, qText);
  //answera
  let txt = qNo.qResult;

  if (qType == "multiArrAns") {
    txt = `${qNo.qResult} \n Chosen Option : ${qNo.chosenOpt}`;
  }
  let ansText = document.createTextNode(txt);
  childAppendFun(aParent, ansText);
};
const eleCreator = (ele) => document.createElement(ele);
const childAppendFun = (parent, child) => parent.appendChild(child);
