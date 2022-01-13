let multiArr = [];
let singleArr = [];
let dataArr = [];
let docs = [];
const getReports = () => {
  // firestore.collection("reports")
  //     .get()
  //     .then((querySnapshot) => {
  //         console.log('running')
  //         querySnapshot.forEach((doc) => {
  //             console.log(doc.id);
  // doc.data() is never undefined for query doc snapshots
  // let docIdUser = doc.id;
  // docs.push(docIdUser);
  // firestore.collection("reports")
  //     .doc(docIdUser)
  //     .collection('questions')
  //     .get()
  //     .then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //             // doc.data() is never undefined for query doc snapshots
  //             console.log(doc.id, '=>', doc.data());
  //         });
  //     });
  // })
  // })
  //   firestore.collection("reports")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id);
  //       });
  //     });
  firestore
    .collection("reports")
    .get()
    .then((querySnapshot) => {
      console.log("running");
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("Runnig");
        console.log("docId", doc.id,doc.data().singleArr);
      });
    });
};
// const getReports = () => {
//     firestore.collection("reports")
//         .get()
//         .then((querySnapshot) => {
//             console.log('running')
//             querySnapshot.forEach((doc) => {
//                 // doc.data() is never undefined for query doc snapshots
//                 let docId = doc.id;
//                 firestore.collection("reports")
//                     .doc(docId)
//                     .collection('questions')
//                     .get()
//                     .then((querySnapshot) => {
//                         querySnapshot.forEach((doc) => {
//                             // doc.data() is never undefined for query doc snapshots
//                             console.log(doc.id, '=>', doc.data());
//                         });
//                     });
//             })
//         })
// }
// firestore.collection("reports").doc('MmFigtYDaDPT6ZM5RRrW9LLQ44r2').get().then((doc) => {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });
// }

getReports();
