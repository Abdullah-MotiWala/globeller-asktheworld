
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
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        })
}
