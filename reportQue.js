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
      console.log(repQues)
    });
};
getRepQue();

//arr to send on firestore
let singleArrAns = [];
let multiArrAns = [];
let dataArrAns = [];
let userObj = {}
let quesObj = {
  singleArrAns,
  multiArrAns,
  dataArrAns,
  userObj
};
let multiAns = 0,
  singleAns = 0,
  dataAns = 0;

//created obj send to db
const sendindDb = () => {
  console.log('sending Db running')
  firestore
    .collection("reports")
    .doc(uid)
    .update({
        answers: firebase.firestore.FieldValue.arrayUnion(quesObj)
      }
    )
    .then((doc) => {
      alert('answer saved')
    });
}
subRepBtn.addEventListener("click", () => {
  addAns();
  userObj.name = document.querySelector("#name").value;
  userObj.email = document.querySelector("#email").value;
  sendindDb()
  //sending user info on db

});

//DOM FUN 1: creating questions divs
const showingQue = (queObjPara) => {
  //div for question
  //data Questions
  let QdataArr = queObjPara.dataArr;
  for (let i = 0; i < QdataArr.length; i++) {
    let queDiv = eleCreator("div");
    queDiv.classList.add('data')
    queDiv.classList.add(i)
    let qNoSpan = eleCreator("span")
    let queNoText = document.createTextNode(`${qNo}`);
    childAppendFun(qNoSpan, queNoText)

    let qSpan = eleCreator("span");
    let queText = document.createTextNode(`${QdataArr[i].q}`);
    childAppendFun(qSpan, queText);

    childAppendFun(queDiv, queNoText);
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
    queDiv.classList.add('single')
    queDiv.classList.add(i)
    let qNoSpan = eleCreator("span")
    let queNoText = document.createTextNode(`${qNo}`);
    childAppendFun(qNoSpan, queNoText)

    let qSpan = eleCreator("span");
    let queText = document.createTextNode(`${QsingleArr[i].q}`);
    childAppendFun(qSpan, queText);

    childAppendFun(queDiv, queNoText);
    childAppendFun(queDiv, queText);
    childAppendFun(repQueDiv, queDiv);

    let ansBar = eleCreator("input");
    ansBar.setAttribute("class", `answer${qNo} queData${i}`);

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
    queDiv.classList.add('multi')
    let qNoSpan = eleCreator("span")
    let queNoText = document.createTextNode(`${qNo}`);
    childAppendFun(qNoSpan, queNoText)

    let qSpan = eleCreator("span");
    let queText = document.createTextNode(`${QmultiArr[i].q}`);
    childAppendFun(qSpan, queText);

    childAppendFun(queDiv, queNoText);
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
    createRad.classList.add(`${type}${qNo}`);
    createRad.classList.add(type);
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
const addAns = () => {

  const questions = repQueDiv.children;
  //for single ques
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].classList.contains('single')) {
      let q = (questions[i].childNodes[1].textContent)
      console.log(q)
      let qNo = questions[i].childNodes[0].textContent

      let inputCheckVal = document.querySelector(`input[name=single${qNo}]:checked`).value;
      let qDetailsArr = repQues.singleArr;
      //chekcing if user select correct option
      if ((qDetailsArr[singleAns].isTrue).toString() == inputCheckVal) {
        qResult = true
      } else {
        qResult = false
      }
      // pushing to local array
      singleArrAns.push({
        q,
        qResult
      })
      singleAns++
    }

    //for multi ques
    if (questions[i].classList.contains('multi')) {
      let q = (questions[i].childNodes[1].textContent)
      let qNo = questions[i].childNodes[0].textContent
      let opts = questions[i].getElementsByTagName("li")
      let inputCheckVal = document.querySelector(`input[name=multi${qNo}]:checked`).value;

      let qDetailsArr = repQues.multiArr;
      console.log(qDetailsArr[multiAns].correct)
      let qResult;
      //checking user select the correct option 
      if (qDetailsArr[multiAns].correct == inputCheckVal) {
        qResult = true
      } else {
        qResult = false
      }
      //pushing into local array
      multiArrAns.push({
        q,
        chosenOpt: opts[inputCheckVal].innerText,
        qResult
      })
      multiAns++
    }

    //for data Ques
    if (questions[i].classList.contains('data')) {
      let answer = document.querySelector(`.queData${i}`).value
      console.log(answer)
      let q = (questions[i].childNodes[1].textContent)
      let qNo = questions[i].childNodes[0].textContent;

      dataArrAns.push({
        q,
        answer
      })
    }
  }
};
const eleCreator = (ele) => document.createElement(ele);
const childAppendFun = (parent, child) => parent.appendChild(child)