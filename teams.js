//this is the new version of the teams code
//this file contains new mehtods and is mutch shorter than the oder version of the file

//constants
const addTeamsdiv = document.getElementById("addTeamsdiv");

//globale variable
var requestHandler = new HandelRequest("datenbanken-ef5/handelDatabase.php");

//function that becomes the teams ids and send other request
function getTeamsids(data){
    for (let i = 0; i < data.length; i++){
        requestHandler.addRequset("getTeamname",["id_team="+data[i][0]], addTeamTodiv);
        requestHandler.addRequset("getPlayersNameWithTeam", ["id_team="+data[i][0]], addPlayerTodiv);
        requestHandler.chainedRequest();
    }
}

//displays the teamname
function addTeamTodiv(data){
    let div = createdivElement();
    addTeamsdiv.appendChild(div);
    div.style.fontFamily = "Helvetica";
    div.classList.add("teamname");
    div.innerHTML = data[0][0];
}

//displays the players
function addPlayerTodiv(data){
    for (let i = 0; i < data.length; i++){
        let div = createdivElement();
        addTeamsdiv.appendChild(div);
        div.style.fontFamily = "Helvetica";
        div.classList.add("playername");
        div.innerHTML = data[i][0][0][0] + " " + data[i][1][0][0];
    }
}

//initialise method
requestHandler.sendSingleRequestHandler("getTeams", [], getTeamsids);