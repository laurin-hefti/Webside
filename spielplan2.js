//this file contains the code for the spielplan2 page

//constans and gobal variables 
const root = document.documentElement;
var requestHandler = new HandelRequest("datenbanken-ef5/handelDatabase.php");

//displays the nummer of teams
function displayDataTeams(data){
    let dataTeamsdiv = document.getElementById("dataTeams");
    dataTeamsdiv.innerHTML = data.length;
}

//displays the nummer of players
function displayDataPlayer(data){
    let dataPlayersdiv = document.getElementById("dataPlayers");
    dataPlayersdiv.innerHTML = data.length;
}

//displays the nummer of referees
function displayDataReferees(data){
    let dataRefereesdiv = document.getElementById("dataReferees");
    dataRefereesdiv.innerHTML = data.length;
}

//displays the nummer of fields
function dispalyDataFields(data){
    let dataFieldsdiv = document.getElementById("dataFields");
    dataFieldsdiv.innerHTML = data.length;
}

//reset the nummer of fields
function senddispalyDataFields(){
    requestHandler.sendSingleRequestHandler("getFields", [], dispalyDataFields);
}

//create the divs to display the nummer of something
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

//send the command to add a new field
function addField(){
    requestHandler.sendSingleRequestHandler("addField", [], senddispalyDataFields);
}

//send the command to remove fields
function removeField(){
    requestHandler.sendSingleRequestHandler("removeFirstElementField", [], senddispalyDataFields);
}

//send the request to get the data and display it 
function getAllData(){
    requestHandler.sendSingleRequestHandler("getTeams", [], displayDataTeams);
    requestHandler.sendSingleRequestHandler("getPlayers", [], displayDataPlayer);
    requestHandler.sendSingleRequestHandler("getReferees", [], displayDataReferees);
    requestHandler.sendSingleRequestHandler("getFields", [], dispalyDataFields);
}

//create a option element
function createElementInSelect(value){
    let e = document.createElement("option");
    e.text = value[0];
    e.value = value[1];
    value[2].add(e);
}

//send request to get the teamids
function getTeamslist(e){
    requestHandler.sendSingleRequestHandler("getTeams",[],getTeamsname,e);
}

//send request to get the teamname for every team
function getTeamsname(data,e){
    for (let i = 0; i < data.length; i++){
        requestHandler.sendSingleRequestHandler("getTeamname",["id_team="+data[i][0]], createSelect, e)
    }
}

//create the select element
function createSelect(data,e){
    createElementInSelect([data[0][0], data[0][0], e[2]]);
}

//create the select fro the player selection
function handelCreateSelect(e){
    createElementInSelect(["alle Teams", "alleTeams", e[2]]);
    createElementInSelect(["imaginäre Teams", "imaginäre Teams", e[2]]);
    getTeamslist(e);
}

//create the select for the games selection
function selectGames(e){
    let liste = ["Alle gegen Alle", "Anzahl Games"];
    for (let i = 0; i < liste.length; i++){
        createElementInSelect([liste[i], liste[i], e[2]]);
    }
}

//displays the nummer of the group
function setNummerofGroup(value){
    value[2].innerHTML = "Guppen Nummer " + groups;
}

//update the group nummer if one group is deleted
function updateGroups(nummer){
    let e = document.getElementsByClassName("group");
    for (let i = 1; i <= e.length; i++){
        let ue = e[i-1].getElementsByClassName("groupplaceholder");
        ue[0].innerHTML = "Gruppen Nummer " + (i);
        e[i-1].id = "group"+(i);
    }
}

//funktions how is used in the comilersystem to create a element
//this funktion adds a funktion to a goup div and wath happens when the element is removed
function removeGroupHandler(e){
    let groupid = document.getElementById("group"+groups);
    let id = groups;
    e[2].addEventListener("click", function(){groupid.remove();groups-=1;updateGroups(id);shiftbutton();});
}

//set the id of an element
function createGroupdiv(e){
    e[2].id = "group"+groups;
}

//places the create plan button correctly
function shiftbutton(){
    let e = document.getElementById("createplandiv");
    let relpos = ~~(groups/6);
    root.style.setProperty("--position-createplandiv",  (840 + 220*relpos).toString()+"px");
}

//new global variables
let c = new compiler("group_manager");

let groups = 0;

//defines the structure of a group div
const group = "div->class=group,style(border-style=solid,border-color=black,width=200px,height=200px,margin=5px,float=left),/:=4;{div->class=groupplaceholder,/:=1;button->&innerHTML=remove,style(background-color=white),/:=3;div->&innerHTML=Teams;select->class=dropdown-menu-teams,&id=teamselect,multiple=true,size=4,/:=0;div->&innerHTML=Spiele;select->class=dropdown-menu-games,&id=gameselect, multiple=true,size=2,/:=2}";

//compiles the operating strucutre from there you can add new grou divs
function openMenueButton(){
    let button = document.getElementById("openGroupPanel");
    button.remove();
    c.addFunctions([addGroup,createGameplan, createplanbutton]);
    c.compile(time); 
}

//adds a new group div
function addGroup(){
    groups += 1;
    shiftbutton();
    c.addFunctions([handelCreateSelect, setNummerofGroup, selectGames, removeGroupHandler,createGroupdiv]);
    c.compile(group);
}

//function witch is setting the name of a button
function createplanbutton(e){
    e[2].innerHTML = "create plan";
}
 
//definition of an gorup div
const time = "div->style(border-style=solid, border-color=balck, width=100%, height=20px, margin=5px, text-align=center);{div->&innerHTML=start,style(float=left);div->&innerHTML=Time; div->&innerHTML=end,style(position=absolute, left=95%,top=568px)};div->style(width=100%, height=25px, margin=5px);{button->&innerHTML=addGroup,style(background-color=white, color=black,border-color=black),*click=0};div->&id=createplandiv,style(background-color=white, width=100%, height=50px, position=absolute);{button->class=button,style(position=relative, left=43%),*click=1,/:=2}";

//collect the data from a group div
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

//function how ask if you realy will collect the data
function createGameplan(){
    let x = confirm("wollen sie den Spielplan wirklich generieren");
    if (x){
        collectData();
    }
}

//function how displays the data on the side
createDataDivs();
getAllData();