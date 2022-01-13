let uid = location.href.split("=")[1];
let repQueDiv = document.querySelector(".ansDiv");
let repQues;
let qNo = 1;
let subRepBtn = document.querySelector(".submitRep");

const getRepQue = () => {
  firestore
    .collection("reports")
    .doc(uid)
    .get()
    .then((doc) => {
      repQues = doc.data().questions;
      showingQue(repQues);
      subRepBtn.style.display = "initial";
    });
};
getRepQue();

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

subRepBtn.addEventListener("click", () => {
  addAns();
});

//DOM FUN 1: creating questions divs
const showingQue = (queObjPara) => {
  //div for question
  //data Questions
  let QdataArr = queObjPara.dataArr;
  for (let i = 0; i < QdataArr.length; i++) {
    let queDiv = eleCreator("div");
    let queText = document.createTextNode(`${qNo})${QdataArr[i].q}`);
    childAppendFun(queDiv, queText);
    childAppendFun(repQueDiv, queDiv);

    let ansBar = eleCreator("input");
    ansBar.setAttribute("class", `answer${qNo} queData${i}`);
    childAppendFun(queDiv, ansBar);
    qNo++;
  }

  //single Questions
  let QsingleArr = queObjPara.singleArr;
  for (let i = 0; i < QsingleArr.length; i++) {
    let queDiv = eleCreator("div");
    let queText = document.createTextNode(`${qNo})${QsingleArr[i].q}`);

    childAppendFun(queDiv, queText);
    childAppendFun(repQueDiv, queDiv);
    creRad("single", ["true", "false"], queDiv);
    qNo++;
  }

  //multi Questions
  let QmultiArr = queObjPara.multiArr;
  for (let i = 0; i < QmultiArr.length; i++) {
    let curMultiQ = QmultiArr[i];
    let queDiv = eleCreator("div");
    let queText = document.createTextNode(`${qNo})${curMultiQ.q}`);

    childAppendFun(queDiv, queText);
    childAppendFun(repQueDiv, queDiv);
    // console.log(QmultiArr[i].options);
    let ulOpts = creUl("multi", curMultiQ.options);

    childAppendFun(queDiv, ulOpts);
  }
  console.log(QmultiArr);
};

//DOM FUNCTION 2: creating Radio for single Questions
const creRad = (type, opt, parent) => {
  for (let i = 0; i < opt.length; i++) {
    let textNode = document.createTextNode(opt[i]);
    let creLabel = document.createElement("label");
    let createRad = document.createElement("input");
    createRad.setAttribute("type", "radio");
    createRad.setAttribute("name", `${type}${qNo}`);
    createRad.setAttribute("value", opt[i]);
    // if (i == 0) {
    //   createRad.setAttribute("checked", "checked");
    // }
    creLabel.appendChild(textNode);
    creLabel.appendChild(createRad);
    //appending to question bar
    parent.appendChild(creLabel);

  }
};

// DOM FUCNTION 3: creating ul for multi Questions
const creUl = (type, dataOpts) => {
  //creating ul for options
  let ulForOpt = document.createElement("ul");
  ulForOpt.setAttribute("class", `ulForOpt${qNo}`);
  options = dataOpts;
  for (let i = 0; i < dataOpts.length; i++) {
    // creating li options
    console.log("loop running on 88");
    let liForOpt = document.createElement("li");
    liForOpt.setAttribute("class", `liOpt${qNo}`);
    textForOpt = eleCreator("span");
    textForOpt.setAttribute("name", "txtOpts");
    let textValue = document.createTextNode(dataOpts[i]);
    childAppendFun(textForOpt, textValue);
    let checkCorrect = eleCreator("input");
    checkCorrect.setAttribute("type", "radio");
    checkCorrect.setAttribute("name", `${type}${qNo}`);
    checkCorrect.setAttribute("value", i);

    liForOpt.appendChild(textForOpt);
    liForOpt.appendChild(checkCorrect);
    // appending to ul
    ulForOpt.appendChild(liForOpt);
  }
  return ulForOpt;
};

//DB FUNCTION 1:sending To DB
// const addAns = () => {
//   const questions = repQueDiv.children;
//   for (let i = 0; i < questions.length; i++) {
//     ansStatus;
//     //sending single question to db
//     if (questions[i].classList.contains(`single${i}`)) {
//       if(document.querySelector(`input[name = single${i}]:checked`).value == ){
//       ansStatus = true; 
//     }
//     else{
//       ansStatus = false
//     }
//     };
//       singleArr.push({
//        ans: ansStatus
//     })
// };

const eleCreator = (ele) => document.createElement(ele);
const childAppendFun = (parent, child) => parent.appendChild(child);
