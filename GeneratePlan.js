//this code is currently not working for larger gorups, you can test it by opening this side on the prowser and look for the prints
//if it runs around 1000 times the the plan is not correctly generated
//because the code is not correctly working an not in use I dont comment dis file 

class InputData {
    constructor(teams, felder) {
        this.teams = teams;
        this.felder = felder;
    }
}

class ProcessedData {
    constructor() {
        this.teams = [];    //teams objects
        this.felder = [];
    }
}

class Team {
    constructor(teamsid) {
        this.teamsid = teamsid;
        this.wait = 0;
        this.games = 0;
        this.oponents = [];
        this.anspiel = 0;
        this.oponents.push(this);
    }
}

class Feld {
    constructor(feldid) {
        this.feldid = feldid;
    }
}

class Match {
    constructor(team1, team2, feld) {
        this.team1 = team1;
        this.team2 = team2;
        this.feld = feld;
    }
}

class Row {
    constructor(matches) {
        this.matches = matches;
    }
}

class Plan{

    constructor(){
        this.inputData;
        this.processedData;
        this.plan = [];
    }

    intiProcessing(inputData) {
        this.processedData = new ProcessedData();
        if (inputData != null){
            this.initialiseTeams(inputData.teams);
            this.initialiseFelder(inputData.felder);
            return true;
        }else{
            console.log("No input Data");
            return false;
        }
    }

    generate(inputData){
        if (this.intiProcessing(inputData)){
            this.generatePlan(this.processedData);
        }
    }

    initialiseTeams(teams) {
        for (let i = 0; i < teams.length; i++) {
            this.processedData.teams.push(new Team(teams[i]));
        }
    }

    initialiseFelder(felder){
        for (let i = 0; i < felder.length; i++){
            this.processedData.felder.push(new Feld(felder[i]));
        }
    }

    sum(nummer){
        let summe = 0;
        while(nummer > 0){
            summe += nummer;
            nummer -= 1;
        }
        return summe;
    }

    calculatecountRows(data){
        let nummerofTeams = data.teams.length;
        let nummerofFelder = data.felder.length;
        let summe = this.sum(nummerofTeams);
        return Math.ceil(summe/nummerofFelder);
    }

    maxgames(games, felder){
        let x = Math.ceil(games/felder);
        return x; 
    }

    handelrow(row, games, felder){
        if (row == 1){
            return felder - this.maxgames(games, felder);
        }else{
            return 0;
        }
    }

    checkallPlayed(data){
        let x = false;
        for (let i = 0; i < data.teams.length; i++){
            if (data.teams[i].oponents.length != data.teams.length){
                x = true;
                break;
            }
        }
        return x;
    }

    generatePlan(data) {
        let nummerofRow = this.calculatecountRows(data);
        let nummerofRowcopie = nummerofRow;
        while (this.checkallPlayed(data)){
            //let x =  this.handelrow(nummerofRow, nummerofRowcopie, data.felder.length);
            let x = 0;
            let row = this.generateRow(data,x);
            this.plan.push(row);
            console.log("row " + x);
            nummerofRow += 1;
            if (nummerofRow >=1000){
                break;
            }
            /*
            if (row.matches.length-x == data.felder.length || true){
                nummerofRow -= 1;
            }
            */
        }
    }
    
    generatePlan2(data){
        let nummerofRow = this.calculatecountRows(data);
        let matches = this.generateRow2(data);
        
    }

    findmaxwait(data) {
        let min = data.teams[0].wait;
        let teams = [];
        for (let i = 0; i < data.teams.lengt; i++){
            if (data.temas[i].wait <= min){
                teams.push(data.teams[i]);
                min = data.teams[i].wait;
            }
        }
        return [min, teams];
    }

    findmingames(data) { //data ist ein ProcessedData object
        let min = data.teams[0].games;
        let teams = [];
        for (let i = 0; i < data.teams.length; i++){
            if (data.teams[i].games == min){
                teams.push(data.teams[i]);
            }
            if (data.teams[i].games < min){
                teams = [];
                min = data.teams[i].games;
                teams.push(data.teams[i]);
            }
        }
        return [min, teams];
    }

    findmingames2(data, nummer){
        let teams = [];
        for (let i = 0; i < data.teams.length; i++){
            if (data.teams[i].games <= nummer){
                teams.push(data.teams[i]);
            }
        }
        return [0,teams];
    }

    findnextTeams(data, next = false){
        let maxwait = this.findmaxwait(data);
        let mingames = this.findmingames(data);
        if (next){
            mingames = this.findmingames2(data, mingames[0]+1);
        }
        //console.log(mingames[0] + " mingames");
        //console.log(mingames[1]);
        return mingames[1];
    }

    getOponent(team, data){
        let oponents = [];
        for (let i = 0; i < data.length; i++){
            if (!team.oponents.includes(data[i])){
                oponents.push(data[i]);
            }
        }
        return oponents;
    }

    generateRow2(data){
        let teams = data.teams;
        let matches = [];
        for (let i = 0; i < teams.lenght; i++){
            if (!teams[0].oponents.includes(teams[i])){
                matches.push(new Match(teams[0], teams[i]));
                teams = teams.filter(element => element !== teams[0]);
                teams = teams.filter(element => element !== teams[i]);
            }
        }
        return matches;
    }

    generateRow(data, gamelimit) {
        let matches = [];
        let stop = 0;
        let teams = this.findnextTeams(data); //achtung im zweitem durchlauf könne temas aus dem erstem durchlauf genommen werden
        for (let i = 0; i < data.felder.length-gamelimit; i++){ // will ein spiel generieren und geht durch die liste bis er zwei teams gefunden hat die spielen können
            let team1 = teams[teams.length-1];
            console.log(teams);
            let oponents = this.getOponent(team1,teams);
            let team2 = oponents[0];
            teams = teams.filter(element => element !== team1);
            teams = teams.filter(element => element !== team2);
            if (team2 == undefined || team1 == undefined) {
                teams = this.findnextTeams(data);// achtung dann könne teams vom jetzigem row genommen werden, und wenn ein team übrig bleibt kann es gegen eines mit mehr games spielen
                for (let j = 0; j < matches.length; j++){
                    teams = teams.filter(element => element !== matches[j].team1);
                    teams = teams.filter(element => element !== matches[j].team2);
                }
                //console.log(teams);
                if (teams.length == 1){
                    let team = teams[0];
                    teams = this.findnextTeams(data, true);
                    teams.unshift(team);
                    for (let j = 0; j < matches.length; j++){
                        teams = teams.filter(element => element !== matches[j].team1);
                        teams = teams.filter(element => element !== matches[j].team2);
                    }
                    console.log("ösldjölajd");
                    if (teams.length <= 1){
                        console.log("lajldsj");
                        break;
                    }
                }
                if (teams == undefined){
                    break;
                }if(stop == 2){
                    break;
                }
                stop += 1;
                i -= 1;
                continue;
            }else{
                stop = 0;
            }
            console.log(team1.teamsid + " gegen " + team2.teamsid);
            /*
            try{
                console.log(team1.teamsid + " gegen " + team2.teamsid);
            }catch{
                console.log(team1.teamsid + " spielte gegen " );
                console.log(teams);
                console.log(this.getOponent(team1, teams));
                for (let j = 0; j < team1.oponents.length; j++){
                    console.log(team1.oponents[j].teamsid);
                }
            }
            */
            team1.games += 1;
            team2.games += 1;
            team1.wait = 0;
            team2.wait = 0;
            team1.oponents.push(team2);
            team2.oponents.push(team1);
            team1.anspiel += 1;
            for (let j = 0; j < teams.lenght; j++){
                teams[j].wait += 1;
            }
            matches.push(new Match(team1, team2, null));
        }
        return new Row(matches);
    }
}

let data = new InputData([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], [1,2,3]);
//let data = new InputData([1,2,3,4,5],[1,2]);

let p = new Plan();
p.generate(data);
for (let i = 0; i < p.processedData.teams.length; i++){
    console.log(p.processedData.teams[i].oponents);
}
console.log(p.plan.length);
/*
console.log(p.plan);
for (let i = 0; i < p.plan.length; i++){
    for (let j = 0; j < p.plan[i].matches.length; j++){
        console.log(p.plan[i].matches[j].team1 + " gegen " + p.plan[i].matches[j].team2);
    }
}
*/
