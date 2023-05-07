//this file contains the code for the myteam page
//this file contains old and new code
//in the moment it is not possible to change the teamname

//constants 
const addPlayerdiv = document.getElementById("addPlayerdiv");
const addPlayerButtondiv = document.getElementById("addPlayerButtondiv");
const removePlayerinputvorname = document.getElementById("removeplayervorname");
const removePlayerinputnachname = document.getElementById("removeplayernachname");
const renameButton = document.getElementById("rename_tea");
const teamnamediv = document.getElementById("teamname");
const setTeamnamediv = document.getElementById("setTeamnamediv");

//global variables witch must be mutable
let statusAddPlayer = 0;
let elements = 0;

let requestHandler = new HandelRequest("datenbanken-ef5/handelDatabase.php");
let c = new compiler("setTeamnamediv");

let status = false;

function setTeamname(name){
    teamnamediv.style.fontFamily = "Helvetica";
    teamnamediv.innerHTML = name[0][0];
}

function getTeamname(){
    return [renameButton.value];
}

function changeTeamnname(){
    let data = getTeamname();
    console.log(data);
}

const inputdiv = "div->class=overlay;div->class=placeholderdiv,style(width=200px,height=100px,backgroundColor=white,position=absolute);{input->placeholder=teamname,style(margin=5px);button->class=button,&innerHTML=bestätigen,*click=0}";

//belongs to the setteamname system
function handelinput(){
    console.log(status);
    if (status == false){
        status = true;
        c.addFunctions([getTeamname]);
        c.compile(inputdiv);
        console.log("test");
    }else{
        while(setTeamnamediv.firstChild){
            setTeamnamediv.removeChild(setTeamnamediv.firstChild);
        }
        status = false;
    }
}

//function witch calls the handle function
function openAddPlayerMenu(){
    handleAddPlayer();
}

//send the request to add a new player and reset the menue field 
function addPlayer(){
    let data = getDataAddPlayer(elements);
    if (data[0] != "" && data[1] != ""){
        requestHandler.sendSingleRequestHandler("insertDataPlayer",["firstname="+data[0],"lastname="+data[1], "team="+localStorage.getItem("id_team")], handleResetPlayerdiv);
        removeElements();
        statusAddPlayer = 0;
    }
}

//delet first all players and set the new
function handleResetPlayerdiv(){
    while (addPlayerdiv.firstChild){
        addPlayerdiv.removeChild(addPlayerdiv.firstChild);
    }
    requestHandler.sendSingleRequestHandler("getPlayersNameWithTeam", ["id_team="+localStorage.getItem("id_team")], handleDisplayPlayers);
}

//this create the element to add a new player
//this is an old function
function createAddPlayerElements(){
    var addPlayerInputfirstname = createInputElement();
    addPlayerInputfirstname.id = "addPlayerInputfirstname";
    addPlayerInputfirstname.classList.add("login_input_element");
    addPlayerInputfirstname.innerHTML = "first name";
    addPlayerInputfirstname.setAttribute("placeholder", "first Name");

    var addPlayerInputlastname = createInputElement();
    addPlayerInputlastname.id = "addPlayerInputlastname";
    addPlayerInputlastname.classList.add("login_input_element");
    addPlayerInputlastname.innerHTML = "last name";
    addPlayerInputlastname.setAttribute("placeholder", "last Name");

    var addPlayerAddButton = createButtonElement();
    addPlayerAddButton.id ="addPlayerButton";
    addPlayerAddButton.classList.add("button");
    addPlayerAddButton.addEventListener("click", addPlayer);
    addPlayerAddButton.innerHTML = "add";
    return [addPlayerInputfirstname, addPlayerInputlastname, addPlayerAddButton];
}

//removes all elements from the add player filed
function removeElements(){
    for (let i = 0; i < elements.length; i++){
        elements[i].remove();
    }
}

//handels the add player field
function handleAddPlayer(){
    if (statusAddPlayer == 0){
        addElementsToAddPlayerdiv();
        statusAddPlayer = 1;
    }
    else{
        removeElements();
        statusAddPlayer = 0;
    }
}

//returns the data from the add player input elements
function getDataAddPlayer(elements){
    return [elements[0].value, elements[1].value];
}

//add the divs to the add player field
function addElementsToAddPlayerdiv(){
    elements = createAddPlayerElements();
    for (let i = 0; i < elements.length; i++){
        addPlayerButtondiv.appendChild(elements[i]);
    }
}
//display the players
function handleDisplayPlayers(myPlayers){
    for (let i = 0; i < myPlayers.length; i++){
        let element = createdivElement();
        element.classList.add("playername");
        element.style.fontFamily = "Helvetica";
        addPlayerdiv.appendChild(element);
        element.innerHTML = myPlayers[i][0][0][0] + " " + myPlayers[i][1][0][0];
    }
}

//return the data from the remove palyer field
function getDataremovePlayer(){
    return [removePlayerinputvorname.value, removePlayerinputnachname.value];
}

//send the request to delet the desired palyer 
function deletPlayer(id_player){
    requestHandler.sendSingleRequestHandler("removePlayer", ["id_player="+id_player[0][0]], resetinputElement);
}

//reset the input elements after sending the request and the data parameter is not used because we dont need the receaved data
function resetinputElement(data){
    removePlayerinputvorname.value = "";
    removePlayerinputnachname.value = "";
    handleResetPlayerdiv();
}

//check if the every slot is filled
function removePlayer(){
    let data = getDataremovePlayer();
    if (data[0] != "" && data[1] != ""){
        requestHandler.sendSingleRequestHandler("getPlayerId", ["firstname="+data[0], "lastname="+data[1]], deletPlayer);
    }
}

//send the request to get and set the teamname and the palyers
requestHandler.sendSingleRequestHandler("getPlayersNameWithTeam", ["id_team="+localStorage.getItem("id_team")], handleDisplayPlayers);
requestHandler.sendSingleRequestHandler("getTeamname", ["id_team="+localStorage.getItem("id_team")], setTeamname);