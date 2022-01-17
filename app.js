const repDiv = document.querySelector(".reports");
let questionsObj;

//FIREBASE FUN 1: getting questions doc
const getReports = () => {
  firestore
    .collection("reports")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        questionsObj = doc.data();
        showingRep(questionsObj);
      });
    });
};


getReports();
//showing reports
const showingRep = (queObj) => {
  let queDiv = eleCreator("div");
  queDiv.classList.add("queReport")

  let queAnchor = eleCreator("a");
  queAnchor.setAttribute("href", `reportQue.html?id=${queObj.uid}`);
  let anchorText = document.createTextNode("Open Report");
  queAnchor.classList.add("repAnchor")
  childAppendFun(queAnchor, anchorText);

  let qDivText = document.createTextNode(`author : ${queObj.author}`);
  childAppendFun(queDiv, queAnchor);
  childAppendFun(queDiv, qDivText);
  childAppendFun(repDiv, queDiv);
};



const eleCreator = (ele) => document.createElement(ele);
const childAppendFun = (parent, child) => parent.appendChild(child);
