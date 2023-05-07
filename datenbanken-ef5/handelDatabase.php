<?php

include "insert.php";
include "getData.php";
include "delet.php";
include "create.php";
include "remove.php";

$servername = "aropawoz.mysql.db.internal";
$username = "aropawoz_laurin";
$password = "zsQvr6FN6LLb*+=T?1Pf";

try{
    $server_connection = new PDO("mysql:host=".$servername."; dbname=aropawoz_volleyball", $username, $password);
    $server_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $server_connection->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
    //echo "connected"."<br>";   
} catch(PDOExeption $e) {
    echo "connaction fild" .$e -> getMessage();
}

//deletData();
//createall();

$request = $_GET["request"];

if ($request == "createUser"){
    $username = $_GET["username"];
    $username2 = getUserId($username);
    $password = $_GET["password"];
    $email = $_GET["email"];
    $admin = $_GET["admin"];
    $id_team = "0";
    if($admin == "0" && $username2 == []){
        insertDataTeam($username."s Team");
        $id_team = getIdTeam($username."s Team")[0][0];
    }
    $response = null;
    if ($username2 == []){
        $response = insertDataUser($username, $password, $email, $id_team, $admin);
    }
    $obj = (Object)[];
    if ($response == 1){
        $obj->mes = "1";
        $obj->data = $id_team;
        $obj->data2 = $username2;
        //$obj->mes = $username;
    }else{
        $obj->mes = "0";
        $obj->data = "username existiert bereits";
    }
    echo(json_encode($obj));
}

if ($request == "logedin"){
    $username = $_GET["username"];
    $password = $_GET["password"];
    $id_user = getUserId($username);
    if ($id_user){
        $id_team = getUserTeam($id_user[0][0]);
    }
    $requestedPassword = null;
    $admin = null;
    if ($id_user != null){
        $requestedPassword = getUserPassword($id_user[0][0]);
        $admin = isAdmin($id_user[0][0]);
    }
    $obj = (Object)[];
    if ($requestedPassword){
        if ((String)$password == $requestedPassword[0][0] && $requestedPassword){
            $obj->mes = "1";
            if ($admin[0][0] == "1"){
                $obj->admin = "1";
            } else{
                $obj->admin = "0";
            }
            $obj->data = $id_team;
        }
    }else{
        $obj->mes = "0";
        //$obj->mes = $id_user;
        //$obj->mes2 = $requestedPassword;
    }
    echo(json_encode($obj));
}

if ($request == "getPlayersNameWithTeam"){
    $id_team = $_GET["id_team"];
    //$id_team = getIdTeam($teamName);
    $id_players = getTeamMemmbers($id_team);
    $obj = (Object)[];
    $obj->data = [];
    for ($i = 0; $i < count($id_players); $i++){
        $obj->data []= getfullName($id_players[$i][0]);
    }
    if ($obj->data || $obj->data == null){
        $obj->mes = "1";
        //$obj->data = $names;
    }else{
        $obj->mes = "0";
        //$obj->data = $names;
    }
    echo(json_encode($obj));
}

if ($request == "insertDataPlayer"){
    $firstname = $_GET["firstname"];
    $lastname = $_GET["lastname"];
    $team = $_GET["team"];
    insertDataPlayer($firstname, $lastname, $team);
    $obj = (Object)[];
    $obj->mes = 1;
    echo(json_encode($obj));
}

if ($request == "getTeamname"){
    $id_team = $_GET["id_team"];
    $teamname = getTeamName($id_team);
    $obj = (Object)[];
    if ($teamname){
        $obj->mes = "1";
        $obj->data = $teamname;
    }else{
        $obj->mes = "0";
    }
    echo(json_encode(($obj)));
}

if ($request == "getTeams"){
    $teams = getIdTeams();
    $obj = (Object)[];
    if (count($teams) >= 0){
        $obj->mes = "1";
        $obj->data = $teams;
    }else{
        $obj->mes = "0";
    }
    echo(json_encode($obj));
}

if ($request == "getPlayers"){
    $players = getIdPlayers();
    $obj = (Object)[];
    if (count($players) >= 0){
        $obj->mes = "1";
        $obj->data = $players;
    }else{
        $obj->mes = "0";
    }
    echo(json_encode($obj));
}

if ($request == "getReferees"){
    $referees = getIdReferees();
    $obj = (Object)[];
    if (count($referees) >= 0){
        $obj->mes = "1";
        $obj->data = $referees;
    }else{
        $obj->mes = "0";
    }
    echo(json_encode($obj));
}

if ($request == "getFields"){
    $fields = getIdFields();
    $obj = (Object)[];
    if (count($fields) >= 0){
        $obj->mes = "1";
        $obj->data = $fields;
    }else{
        $obj->mes = "0";
    }
    echo(json_encode($obj));
}

if ($request == "addField"){
    insertDataField("field");
    $obj = (Object)[];
    $obj->mes = 1;
    echo(json_encode($obj));
}

if ($request == "removeFirstElementField"){
    deletastFieldElement();
    $obj = (Object)[];
    $obj->mes = 1;
    echo(json_encode($obj));
}

if ($request == "getPlayerId"){
    $firstname = $_GET["firstname"];
    $lastname = $_GET["lastname"];
    $data = getPlayerId($firstname, $lastname);
    $obj = (Object)[];
    if ($data){
        $obj->mes = 1;
        $obj->data = $data;
    }else{
        $obj->mes = 0;
    }
    echo(json_encode($obj));
}

if ($request == "removePlayer"){
    $id_player = $_GET["id_player"];
    deletPlayer($id_player);
    $obj = (Object)[];
    $obj->mes = 1;
    $obj->data = $id_player;
    echo(json_encode($obj));
}


?>