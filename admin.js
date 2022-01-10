const loginStatus = document.querySelector(".loginStatus");
//authStateChange



//signUp Function
const signUp = () => {
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(userEmail, userPassword)
        .then((userCred) => {
            const user = userCred.user
            alert("Sign Up SuccessFully");
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            console.log(user.email)
            document.querySelector(".loginStatus").innerHTML = user.email
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        })
}


//Sign In function
const signIn = () => {
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;
    console.log(userEmail, userPassword)
    auth.signInWithEmailAndPassword('a@c1.com', '123456')
        .then((userCred) => {
            const user = userCred.user
            alert("Sign In SuccessFully");
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            console.log(user.email)
            document.querySelector(".loginStatus").innerHTML = user.email
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        })
}


//Logout Function
// const logOut = () => {
//     auth.signOut().then(() => {
//         alert("Log out...");
//         document.querySelector(".loginStatus").innerHTML = "Not Logged In";
//     }).catch((error) => {
//         alert(error.message)
//     });
// }

