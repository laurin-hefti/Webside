//Constants
const buttonBack2 = document.getElementById("back2");
const buttonLogin2 = document.getElementById("back_to_login");
const inputElementRegisterUsername = document.getElementById("registerUsername");
const inputElementRegisterPassword = document.getElementById("registerPassword");
const inputElementRegisterEmailadress = document.getElementById("registerEmailadress");
const buttonConfirmRegister = document.getElementById("confirmRegister");

const errorDivPlaceholderRegisterUsername = document.getElementById("errorDivPlaceholderRegisterUsername");
const errorDivPlaceholderRegisterPassword = document.getElementById("errorDivPlaceholderRegisterPassword");
const errorDivPlaceholderRegisterEmail = document.getElementById("errorDivPlaceholderRegisterEmail");

const newErrorDivRegisterUsername = document.createElement("div");
const newErrorDivRegisterPassword = document.createElement("div");
const newErrorDivRegisterEmail = document.createElement("div");

var storedRegisterData;

function createNewDivRegister(){
    newErrorDivRegisterUsername.classList.add("errorPlaceholder");
    newErrorDivRegisterUsername.id = "errorDivRegisterUsername";
    errorDivPlaceholderRegisterUsername.appendChild(newErrorDivRegisterUsername);
    newErrorDivRegisterPassword.classList.add("errorPlaceholder");
    newErrorDivRegisterPassword.id = "errorDivRegisterPassword";
    errorDivPlaceholderRegisterPassword.appendChild(newErrorDivRegisterPassword);
    newErrorDivRegisterEmail.classList.add("errorPlaceholder");
    newErrorDivRegisterEmail.id = "errorDivRegisterUserEmail";
    errorDivPlaceholderRegisterEmail.appendChild(newErrorDivRegisterEmail);
}

function getRegisterData() {
    let username = inputElementRegisterUsername.value;
    let passowrd = inputElementRegisterPassword.value;
    let email = inputElementRegisterEmailadress.value;
    return [username, passowrd, email];
}


function storeRegisterDataf() {
    let data = getRegisterData();
    storeRegisterData = new ImputData(1,data[0], data[1], data[2]);
}

function handelRegister(){
    //storeRegisterDataf();
    let data = getRegisterData();
    let x = 1;
    if (data[0] == ""){
        newErrorDivRegisterUsername.innerHTML = "Username eingeben";
        x = 0;
    }
    if (data[1] == ""){
        newErrorDivRegisterPassword.innerHTML = "Passwort eingeben";
        x = 0;
    }
    if (data[2] == ""){
        newErrorDivRegisterEmail.innerHTML = "Email eingeben";
        x = 0;
    }
    if (x == 1){
        checkRegister(data[0], data[1], data[2]);
    }
}

function checkRegister(username, password, email) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //document.getElementById("test").innerHTML = this.responseText;
        //console.log(this.responseText);
        let myobj = this.responseText;
        //console.log(JSON.parse(myobj).data);
        if (JSON.parse(myobj).mes == "1"){
            localStorage.setItem("id_team", JSON.parse(myobj).data);
            openLogedin();
        }else{
            alert("der Username existiert bereits");
        }

      }
    };
    xhttp.open("GET", "/Webside/datenbanken-ef5/handelDatabase.php?request=createUser&username="+username+"&password="+password+"&email="+email+"&admin=0", true);
    xhttp.send();
}


if (buttonBack2 && buttonLogin2 && buttonConfirmRegister) {
    buttonBack2.addEventListener("click", openMain);
    buttonLogin2.addEventListener("click", openLogin);
    if (inputElementRegisterUsername != null && inputElementRegisterPassword != null && inputElementRegisterEmailadress != null) {
        buttonConfirmRegister.addEventListener("click", handelRegister);
    }
    createNewDivRegister();
}