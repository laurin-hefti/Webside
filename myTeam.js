const addPlayerdiv = document.getElementById("addPlayerdiv");
const addPlayerButtondiv = document.getElementById("addPlayerButtondiv");
const removePlayerinputvorname = document.getElementById("removeplayervorname");
const removePlayerinputnachname = document.getElementById("removeplayernachname");
//const resetdiv = document.getElementById("resetDiv");
const teamnamediv = document.getElementById("teamname");

var statusAddPlayer = 0;
var elements = 0;

var requestHandler = new HandelRequest("/Webside/datenbanken-ef5/handelDatabase.php");


function setTeamname(name){
    teamnamediv.style.fontFamily = "Helvetica";
    teamnamediv.innerHTML = name[0][0];
}

function openAddPlayerMenu(){
    handleAddPlayer();
}

function addPlayer(){
    let data = getDataAddPlayer(elements);
    if (data[0] != "" && data[1] != ""){
        requestHandler.sendSingleRequestHandler("insertDataPlayer",["firstname="+data[0],"lastname="+data[1], "team="+localStorage.getItem("id_team")], handleResetPlayerdiv);
        removeElements();
        statusAddPlayer = 0;
    }
}

function handleResetPlayerdiv(data){
    while (addPlayerdiv.firstChild){
        addPlayerdiv.removeChild(addPlayerdiv.firstChild);
    }
    requestHandler.sendSingleRequestHandler("getPlayersNameWithTeam", ["id_team="+localStorage.getItem("id_team")], handleDisplayPlayers);
}

function createAddPlayerElements(){
    var addPlayerInputfirstname = createInputElement();
    addPlayerInputfirstname.id = "addPlayerInputfirstname";
    addPlayerInputfirstname.classList.add("login_input_element"); //is not a login_input_element
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

function removeElements(){
    for (let i = 0; i < elements.length; i++){
        elements[i].remove();
    }
}

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

function getDataAddPlayer(elements){
    return [elements[0].value, elements[1].value];
}

function addElementsToAddPlayerdiv(){
    elements = createAddPlayerElements();
    //console.log(elements);
    for (let i = 0; i < elements.length; i++){
        addPlayerButtondiv.appendChild(elements[i]);
    }
}

function handleDisplayPlayers(myPlayers){
    for (let i = 0; i < myPlayers.length; i++){
        let element = createdivElement();
        element.classList.add("playername");
        element.style.fontFamily = "Helvetica";
        addPlayerdiv.appendChild(element);
        //console.log(myPlayers);
        element.innerHTML = myPlayers[i][0][0][0] + " " + myPlayers[i][1][0][0];
    }
}


function getDataremovePlayer(){
    return [removePlayerinputvorname.value, removePlayerinputnachname.value];
}

function deletPlayer(id_player){
    requestHandler.sendSingleRequestHandler("removePlayer", ["id_player="+id_player[0][0]], resetinputElement);
}

function resetinputElement(data){
    removePlayerinputvorname.value = "";
    removePlayerinputnachname.value = "";
    handleResetPlayerdiv();

}

function removePlayer(){
    let data = getDataremovePlayer();
    if (data[0] != "" && data[1] != ""){
        requestHandler.sendSingleRequestHandler("getPlayerId", ["firstname="+data[0], "lastname="+data[1]], deletPlayer);
    }
}

requestHandler.sendSingleRequestHandler("getPlayersNameWithTeam", ["id_team="+localStorage.getItem("id_team")], handleDisplayPlayers);
requestHandler.sendSingleRequestHandler("getTeamname", ["id_team="+localStorage.getItem("id_team")], setTeamname);