const addTeamsdiv = document.getElementById("addTeamsdiv");

var requestHandler = new HandelRequest("/Webside/datenbanken-ef5/handelDatabase.php");

function addTeamsnameTodiv(data){
    for (let i = 0; i < data.length; i++){
        requestHandler.addRequset("getTeamname",["id_team="+data[i][0]], addTeamTodiv);
        requestHandler.addRequset("getPlayersNameWithTeam", ["id_team="+data[i][0]], addPlayerTodiv);
        requestHandler.chainedRequest();
    }
}

function addTeamTodiv(data){
    let div = createdivElement();
    addTeamsdiv.appendChild(div);
    div.style.fontFamily = "Helvetica";
    div.classList.add("teamname");
    div.innerHTML = data[0][0];
}

function addPlayerTodiv(data){
    for (let i = 0; i < data.length; i++){
        let div = createdivElement();
        addTeamsdiv.appendChild(div);
        div.style.fontFamily = "Helvetica";
        div.classList.add("playername");
        div.innerHTML = data[i][0][0][0] + " " + data[i][1][0][0];
    }
}

requestHandler.sendSingleRequestHandler("getTeams", [], addTeamsnameTodiv);