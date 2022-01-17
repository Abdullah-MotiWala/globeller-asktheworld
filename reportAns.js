let reportName = location.href.split("=")[1].split("?")[0];
let userName = location.href.split("=")[2];
let ansDiv = document.querySelector(".ansDet")
let userHead = document.querySelector(".userHead");
let answers;
//FIREBASE FUN 1: getting questions doc
const getReports = () => {
    document.querySelector(".userHead").innerText = `Answers of ${userName}` 
    firestore
        .collection("reports")
        .where("reportName", "==", reportName)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                ansDiv.innerHTML = " "
                // let ansDoc = doc.data().answers;
                answers = doc.data().answers
                getAns(answers)
            });
        });
};
getReports()

//looping asnwer for getting through name
const getAns = (ansArr) => {
    ansArr.forEach((ansObj) => {
        let userObjName = ansObj.userObj.name.split(" ").join("");
        if (userName == userObjName)
            ansDet(ansArr)
    })
}

const ansDet = () => {
    let queDiv = eleCreator("div");
    queDiv.classList.add("queAnsDet")

    let queAnchor = eleCreator("div");
    let anchorText = document.createTextNode("question");
    queAnchor.classList.add("repAns")
    childAppendFun(queAnchor, anchorText);

    let qDivText = document.createTextNode(`answer`);
    childAppendFun(queDiv, queAnchor);
    childAppendFun(queDiv, qDivText);
    childAppendFun(ansDiv, queDiv);
    console.log(queDiv);
}

const eleCreator = (ele) => document.createElement(ele);
const childAppendFun = (parent, child) => parent.appendChild(child);