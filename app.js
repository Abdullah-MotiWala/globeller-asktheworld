const getReports = () =>{
firestore.collection("reports").get()
.then((querySnapShot)=>{
    querySnapShot.forEach((doc)=>{
        console.log(doc.id + '=>' + doc.data())
    })
})
}
getReports()