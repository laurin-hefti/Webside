const buttonLogin = document.getElementById("login");
const buttonBack = document.getElementById("back");

function openLogin(){
    window.location.href = "login.html";
}

function openMain(){
    window.location.href = "form.html";
}

if (buttonLogin){
    buttonLogin.addEventListener("click",openLogin);
}

if (buttonBack){
    buttonBack.addEventListener("click",openMain);
}