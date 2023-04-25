const addTeamsdiv = document.getElementById("addTeamsdiv");
var addTeamsdivlist = [];

var requestHandler = new HandelRequest("/Webside/datenbanken-ef5/handelDatabase.php");


function handelTeams(teams){
    for (let i = 0; i < teams.length; i++){
        addTeamsdivlist.push(createdivElement());
        addTeamsdivlist[addTeamsdivlist.length-1].classList.add("dynamic_list_placeholder");
        addTeamsdiv.appendChild(addTeamsdivlist[addTeamsdivlist.length-1]);
        getTeamname(teams[i][0]);
    }
    //while(serverData.playersname[teams.length-1] == null){}
    displayData();
}

function displayData(){
  for (let i = 0; i <serverData.teamsname.length; i++){
    let divTeamname = createdivElement();
    addTeamsdiv.appendChild(divTeamname);
    divTeamname.classList.add("playername");
    divTeamname.innerHTML = serverData.teamsname[i];
    for (let j = 0; i < serverData.playersname[j].length; j++){
      let divPlayeranme = createdivElement();
      addTeamsdiv.appendChild(divPlayeranme);
      divPlayeranme.classList.add("playername");
      divTeamname.innerHTML = serverData.playersname[i][j];
      console.log("test");
    }
  }
}

function handeldisplayTeams(teamname, id_team){
  serverData.teamsname.push(teamname)
  serverData.playersname.push([]);
  getmyTeamPlayers(id_team);
  /*
  let addTeam = createdivElement();
  addTeamsdiv.appendChild(addTeam);
  addTeam.classList.add("playername");
  addTeam.innerHTML = teamname;
  addTeamsdivlist.push(addTeam);
  */
}

function handleDisplayPlayers(myPlayers){
  for (let i = 0; i < myPlayers.length; i++){
      serverData.playersname[serverData.playersname.length-1].push(myPlayers[i][0][0][0] + myPlayers[i][1][0][0]);
      /*
      let element = createdivElement();
      element.classList.add("playername");
      addTeamsdivlist[i].appendChild(element);
      //console.log(myPlayers);
      element.innerHTML = myPlayers[i][0][0][0] + " " + myPlayers[i][1][0][0];
      */
  }
}

function getTeams(func) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let myobj = this.responseText;
        if (JSON.parse(myobj).mes == "1"){
            teams = JSON.parse(myobj).data;
            //handelTeams(teams);
            func(teams);
        }else{
            //console.log("test");
        }
      }
    };
    xhttp.open("GET", "/Webside/datenbanken-ef5/handelDatabase.php?request=getTeams", true);
    xhttp.send();
}

function getTeamname(id_team) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let myobj = this.responseText;
        if (JSON.parse(myobj).mes == "1"){
            let teamname = JSON.parse(myobj).data;
            handeldisplayTeams(teamname[0][0]);
        }else{
            //console.log("test");
            return "none";
        }
      }
    };
    xhttp.open("GET", "/Webside/datenbanken-ef5/handelDatabase.php?request=getTeamname&id_team="+id_team, true);
    xhttp.send();
}


//getTeams(handelTeams);
requestHandler.sendSingleRequestHandler("getTeams", [], handeldisplayTeams);