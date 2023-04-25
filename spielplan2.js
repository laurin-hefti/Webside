const root = document.documentElement;
var requestHandler = new HandelRequest("/Webside/datenbanken-ef5/handelDatabase.php");

function displayDataTeams(data){
    let dataTeamsdiv = document.getElementById("dataTeams");
    dataTeamsdiv.innerHTML = data.length;
}

function displayDataPlayer(data){
    let dataPlayersdiv = document.getElementById("dataPlayers");
    dataPlayersdiv.innerHTML = data.length;
}

function displayDataReferees(data){
    let dataRefereesdiv = document.getElementById("dataReferees");
    dataRefereesdiv.innerHTML = data.length;
}

function dispalyDataFields(data){
    let dataFieldsdiv = document.getElementById("dataFields");
    dataFieldsdiv.innerHTML = data.length;
}

function senddispalyDataFields(){
    requestHandler.sendSingleRequestHandler("getFields", [], dispalyDataFields);
}

function createDataDivs(){
    let dispalyData = ["displayDataTeams", "displayDataPlayers", "displayDataReferees", "displayDataFields"];
    let dispalyDatadiv = ["dataTeams", "dataPlayers", "dataReferees", "dataFields"];
    for (let i = 0; i < dispalyData.length; i++){
        let div = document.getElementById(dispalyData[i]);
        let e = createdivElement();
        e.id = dispalyDatadiv[i];
        div.appendChild(e);
    }
}

function addField(){
    requestHandler.sendSingleRequestHandler("addField", [], senddispalyDataFields);
}

function removeField(){
    requestHandler.sendSingleRequestHandler("removeFirstElementField", [], senddispalyDataFields);
}


function getAllData(){
    requestHandler.sendSingleRequestHandler("getTeams", [], displayDataTeams);
    requestHandler.sendSingleRequestHandler("getPlayers", [], displayDataPlayer);
    requestHandler.sendSingleRequestHandler("getReferees", [], displayDataReferees);
    requestHandler.sendSingleRequestHandler("getFields", [], dispalyDataFields);
}



function createElementInSelect(value){
    let e = document.createElement("option");
    e.text = value[0];
    e.value = value[1];
    value[2].add(e);
}

function getTeamslist(e){
    requestHandler.sendSingleRequestHandler("getTeams",[],getTeamsname,e);
}

function getTeamsname(data,e){
    for (let i = 0; i < data.length; i++){
        requestHandler.sendSingleRequestHandler("getTeamname",["id_team="+data[i][0]], createSelect, e)
    }
}

function createSelect(data,e){
    createElementInSelect([data[0][0], data[0][0], e[2]]);
}

function handelCreateSelect(e){
    createElementInSelect(["alle Teams", "alleTeams", e[2]]);
    createElementInSelect(["imaginäre Teams", "imaginäre Teams", e[2]]);
    getTeamslist(e);
}

function selectGames(e){
    let liste = ["Alle gegen Alle", "Anzahl Games"];
    for (let i = 0; i < liste.length; i++){
        createElementInSelect([liste[i], liste[i], e[2]]);
    }
}

function setNummerofGroup(value){
    value[2].innerHTML = "Guppen Nummer " + groups;
}

function updateGroups(nummer){
    let e = document.getElementsByClassName("group");
    //console.log(e);
    //console.log(nummer + " "+ e.length);
    for (let i = 1; i <= e.length; i++){
        let ue = e[i-1].getElementsByClassName("groupplaceholder");
        //console.log(ue[0].textContent + " " + (i+1));
        ue[0].innerHTML = "Gruppen Nummer " + (i);
        e[i-1].id = "group"+(i);
    }
}

function removeGroupHandler(e){
    let groupid = document.getElementById("group"+groups);
    let id = groups;
    e[2].addEventListener("click", function(){groupid.remove();groups-=1;updateGroups(id);shiftbutton();});
}

function createGroupdiv(e){
    e[2].id = "group"+groups;
}

function shiftbutton(){
    let e = document.getElementById("createplandiv");
    let relpos = ~~(groups/6);
    root.style.setProperty("--position-createplandiv",  (840 + 220*relpos).toString()+"px");
    //e.outerHTML = e.outerHTML;
    //console.log((800 + 200*relpos).toString()+"px");
    //console.log(root.style.getPropertyValue("--position-createplandiv"));
}

/*
function toggleDrowdown(){
    console.log("test");
    let dropdownMenu = document.querySelector('.dropdown-menu');
    console.log(dropdownMenu);
    dropdownMenu.classList.toggle('show');
}
*/
let c = new compiler("group_manager");

var groups = 0;

const group = "div->class=group,style(border-style=solid,border-color=black,width=200px,height=200px,margin=5px,float=left),/:=4;{div->class=groupplaceholder,/:=1;button->&innerHTML=remove,style(background-color=white),/:=3;div->&innerHTML=Teams;select->class=dropdown-menu-teams,&id=teamselect,multiple=true,size=4,/:=0;div->&innerHTML=Spiele;select->class=dropdown-menu-games,&id=gameselect, multiple=true,size=2,/:=2}";

function openMenueButton(){
    let button = document.getElementById("openGroupPanel");
    button.remove();
    c.addFunctions([addGroup,createGameplan, createplanbutton]);
    c.compile(time); 
}

function addGroup(){
    groups += 1;
    shiftbutton();
    c.addFunctions([handelCreateSelect, setNummerofGroup, selectGames, removeGroupHandler,createGroupdiv]);
    c.compile(group);
}

function createplanbutton(e){
    e[2].innerHTML = "create plan";
}
  
const time = "div->style(border-style=solid, border-color=balck, width=100%, height=20px, margin=5px, text-align=center);{div->&innerHTML=start,style(float=left);div->&innerHTML=Time; div->&innerHTML=end,style(position=absolute, left=95%,top=528px)};div->style(width=100%, height=25px, margin=5px);{button->&innerHTML=addGroup,style(background-color=white, color=black,border-color=black),*click=0};div->&id=createplandiv,style(background-color=white, width=100%, height=50px, position=absolute);{button->class=button,style(position=relative, left=43%),*click=1,/:=2}";

function collectData(){
    let selectedteamslist = [];
    let selectedgroupslist = [];
    for (let i = 0; i < groups; i++){
        let c = document.getElementById("group"+(i+1));
        let teams = c.getElementsByClassName("dropdown-menu-teams")[0];
        let groups = c.getElementsByClassName("dropdown-menu-games")[0];
        let selectedteams = teams.querySelectorAll("option:checked");
        let selectedgroups = groups.querySelectorAll("option:checked");
        selectedteamslist.push(selectedteams);
        selectedgroupslist.push(selectedgroups);
        console.log(selectedteams + "  "+ selectedgroups);
    }
}

function createGameplan(){
    let x = confirm("wollen sie den Spielplan wirklich generieren");
    if (x){
        collectData();
    }
}

createDataDivs();
getAllData();