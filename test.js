//Constants
const buttonLogin = document.getElementById("login");
const buttonBack = document.getElementById("back");
const buttonRegister = document.getElementById("register");
const buttonBack2 = document.getElementById("back2");
const buttonLogin2 = document.getElementById("back_to_login");
const inputElementLoginUsername = document.getElementById("loginName");
const inputElementLoginPassword = document.getElementById("loginPassword");
const inputElementRegisterUsername = document.getElementById("registerName");
const inputElementRegisterPassword = document.getElementById("registerPassword");
const inputElementRegisterEmailadress = document.getElementById("registerEmailadress");
const buttonConfirmLogin = document.getElementById("confirmLogin");
const buttonConfirmRegister = document.getElementById("confirmRegister");

var storedLoginData;
var storedRegisterData;


function openLogin(){
    window.location.href = "login.html";
}

function openMain(){
    window.location.href = "form.html";
}

function openRegister(){
    window.location.href = "register.html";
}

function getLoginData(){
    var username = inputElementLoginUsername.value;
    var password = inputElementLoginPassword.value;
    return [username, password];
}

function getRegisterData(){
    var username = inputElementRegisterPassword.ariaValueText;
    var passowrd = inputElementRegisterPassword.ariaValueText;
    var email = inputElementRegisterEmailadress.ariaValueText;
    return [username, passowrd, email];
}

function storeLoginData(){
    var data = getLoginData();
    storeLoginData = new ImputData(0,data[0],data[1], null);
}

function storeRegisterData(){
    var data = getRegisterData();
    storeRegisterData = new ImputData(1,data[0], data[1], data[2]);
}

function checkLogin(func){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "main.php", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            var response = xhr.responseText;
            //alert(response);
            return response;        
        }
    };
    xhr.send("func="+func);
}

class ImputData{
    constructor(mode, username, password, email){
        var mode;
        var username;
        var password;
        var email;
    }
}

//Buttonbindings
if (buttonLogin){
    buttonLogin.addEventListener("click",openLogin);
}

//Buttoninitialiser for login.html
if (buttonBack && buttonRegister && buttonConfirmLogin){
    buttonBack.addEventListener("click",openMain);
    buttonRegister.addEventListener("click",openRegister);
}

//Buttoninitialiser for register.html
if (buttonBack2 && buttonLogin2 && buttonConfirmRegister){
    buttonBack2.addEventListener("click", openMain);
    buttonLogin2.addEventListener("click", openLogin);

}

if (inputElementLoginUsername && inputElementLoginPassword){
    buttonConfirmLogin.addEventListener("click", storeLoginData); //daten werden nur zurückgegeben
}

if (inputElementRegisterUsername && inputElementRegisterPassword && inputElementRegisterEmailadress){
    buttonConfirmRegister.addEventListener("click", storeRegisterData); //daten werden nur zurückgegeben
}
