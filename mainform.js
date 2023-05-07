//this side contains not mutch js code because all buttonfunctions are declared in the inputfuncions file, this function is only for histroical reasons
//hear to see the progress of the code.
//this is a way to add a function to a button, but this way is very unusual and is replaced with the onclick attribut in the html code
const buttonLogin = document.getElementById("login");

if (buttonLogin) {
    buttonLogin.addEventListener("click", openLogin);
}
