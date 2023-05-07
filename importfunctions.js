//this file contains functions witch are used in other files, mostly functions to open new pages or to create elements

function openLogin() {
    window.location.href = "login.php";
}

function openMain() {
    window.location.href = "index.php";
}

function openRegister() {
    window.location.href = "register.php";
}

function openLogedin(){
    window.location.href = "logedin.php";
}

function openmyTeam(){
    window.location.href = "myTeam.php";
}

function openSpielplan(){
    window.location.href = "spielPlan.php";
}

function openLehrer(){
    window.location.href = "lehrer.php";
}

function createInputElement(){
    return document.createElement("input");
}

function createButtonElement(){
    return document.createElement("button");
}

function createdivElement(){
    return document.createElement("div");
}