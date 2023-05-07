//this file contains the code for the register page
//this file is an old file and is not updated with the new funtions and features

//constants
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

//when a user try to register and dont fill all options out, then a message will apperar, this function create this error div Placeholders
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

//this function returns the data in the input elements
function getRegisterData() {
    let username = inputElementRegisterUsername.value;
    let passowrd = inputElementRegisterPassword.value;
    let email = inputElementRegisterEmailadress.value;
    return [username, passowrd, email];
}

//this function handels the register event, so if the user dosnt fill out very option then the error message will apear
function handelRegister(){
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

//this function sends the request to the server and will cause an error wenn the username is already used
//this is an old function and will be replaced in other files
function checkRegister(username, password, email) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let myobj = this.responseText;
        if (JSON.parse(myobj).mes == "1"){
            localStorage.setItem("id_team", JSON.parse(myobj).data);
            openLogedin();
        }else{
            alert("der Username existiert bereits");
        }

      }
    };
    xhttp.open("GET", "datenbanken-ef5/handelDatabase.php?request=createUser&username="+username+"&password="+password+"&email="+email+"&admin=0", true);
    xhttp.send();
}

//this code initialises the buttens with the old method
if (buttonBack2 && buttonLogin2 && buttonConfirmRegister) {
    buttonBack2.addEventListener("click", openMain);
    buttonLogin2.addEventListener("click", openLogin);
    if (inputElementRegisterUsername != null && inputElementRegisterPassword != null && inputElementRegisterEmailadress != null) {
        buttonConfirmRegister.addEventListener("click", handelRegister);
    }
    createNewDivRegister();
}