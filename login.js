//Constants
const buttonBack = document.getElementById("back");
const buttonRegister = document.getElementById("register");
const inputElementLoginUsername = document.getElementById("loginName");
const inputElementLoginPassword = document.getElementById("loginPassword");
const buttonConfirmLogin = document.getElementById("confirmLogin");

const errorDivPlaceholderLoginUsername = document.getElementById("errorDivPlaceholderLoginUsername");
const errorDivPlaceholderLoginPassword = document.getElementById("errorDivPlaceholderLoginPassword");

const newErrorDivLoginUsername = document.createElement("div");
const newErrorDivLoginPassword = document.createElement("div");

var storedLoginData;

function createNewDivLogin(){
    newErrorDivLoginUsername.classList.add("errorPlaceholder"); //style
    newErrorDivLoginUsername.id = "errorDivLoginUsername";
    errorDivPlaceholderLoginUsername.appendChild(newErrorDivLoginUsername);
    newErrorDivLoginPassword.classList.add("errorPlaceholder");
    newErrorDivLoginPassword.id = "errorDivLoginPassword";
    errorDivPlaceholderLoginPassword.appendChild(newErrorDivLoginPassword);
}

function getLoginData() {
    let username = inputElementLoginUsername.value;
    let password = inputElementLoginPassword.value;
    return [username, password];
}

function storeLoginData() {
    let data = getLoginData();
    storedLoginData = new ImputData(0,data[0],data[1], null);
}


function handelLogin(){
    //storeLoginData();
    let data = getLoginData();
    let x = 1;
    if (data[0] == ""){
        newErrorDivLoginUsername.innerHTML = "Username eingeben";
        x = 0;
    }
    if (data[1] == ""){
        newErrorDivLoginPassword.innerHTML = "Passwort eingeben";
        x = 0;
    }
    if (x == 1){
        checkLogin(data[0], data[1]);
    }
}

function checkLogin(username, password) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let myobj = this.responseText;
        let obj = JSON.parse(myobj);
        if (obj.mes == "1"){
            localStorage.setItem("id_team", obj.data[0][0]);
            let admin = obj.admin[0][0];
            if (admin == "0"){
                openLogedin();
            }else{
                openLehrer();
            }
        }else{
            console.log("wrong password or username");
            alert("Falser username oder password");
        }
      }
    };
    xhttp.open("GET", "/Webside/datenbanken-ef5/handelDatabase.php?request=logedin&username="+username+"&password="+password, true);
    xhttp.send();
}

if (buttonBack && buttonRegister && buttonConfirmLogin) {
    buttonBack.addEventListener("click",openMain);
    buttonRegister.addEventListener("click",openRegister);
    if (inputElementLoginUsername && inputElementLoginPassword) {
        buttonConfirmLogin.addEventListener("click", handelLogin);
    }
    createNewDivLogin();
}
