<?php
function getIdTeams(){
    global $server_connection;
    $data = "SELECT id_team FROM team";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getTeamName($teamId){
    global $server_connection;
    $data = "SELECT team.name FROM team WHERE '$teamId' = id_team";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getIdTeam($teamName){
    global $server_connection;
    $data = "SELECT id_team FROM team WHERE '$teamName' = team.name";
    $ouput = $server_connection->query($data);
    $ouput = $ouput->fetchAll();
    return $ouput;
}

function getIdPlayers(){
    global $server_connection;
    $data = "SELECT id_player FROM player";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getPlayerId($firstname, $lastname){
    global $server_connection;
    $data = "SELECT id_player FROM player WHERE '$firstname' = firstname AND '$lastname' = lastname";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getPlayerFirstname($playerId){
    global $server_connection;
    $data = "SELECT firstname FROM player WHERE '$playerId' = id_player";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getPlayerLastname($playerId){
    global $server_connection;
    $data = "SELECT lastname FROM player WHERE '$playerId' = id_player";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getfullName($playerId){
    $firstname = getPlayerFirstname($playerId);
    $lastname = getPlayerLastname($playerId);
    return [$firstname, $lastname];
}

function getTeamMemmbers($team){
    global $server_connection;
    //$list = [];
    $data = "SELECT id_player FROM player WHERE '$team' = team";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    //$list []=$output;
    return $output;
}

function getIdReferees(){
    global $server_connection;
    $data = "SELECT id_referee FROM referee";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getRefereePlayerId($refereeId){
    global $server_connection;
    $data = "SELECT player FROM referee WHERE '$refereeId' = id_referee";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getRefereeName($refereeId){
    global $server_connection;
    $playerId = getRefereePlayerId($refereeId);
    $data = "SELECT id_player FROM player WHERE '$playerId' = id_player";
    $output = $server_connection->query($data);
    $output = getfullName($output);
    return $output;
}

function getIdFields(){
    global $server_connection;
    $data = "SELECT id_field FROM field";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getFieldname($id_field){
    global $server_connection;
    $data = "SELECT field.name FROM fiel WHERE '$id_field' = id_field";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getGames(){
    global $server_connection;
    $data = "SELECT id_game FROM game";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getFieldNorth($gameId){
    global $server_connection;
    $data = "SELECT fieldnorth FROM game WHERE '$gameId' = id_game";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getFieldSouth($gameId){
    global $server_connection;
    $data = "SELECT field FROM game WHERE '$gameId' = id_game";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getfield($fieldId){
    global $server_connection;
    $data = "SELECT fieldsouth FROM game WHERE '$fieldId' = id_game";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getFieldreferee($gameId){
    global $server_connection;
    $data = "SELECT referee FROM game WHERE '$gameId' = id_game";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getGroups(){
    global $server_connection;
    $data = "SELECT id_group FROM group";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getGroupname($groupId){
    global $server_connection;
    $data = "SELECT group.name FROM group WHERE '$groupId' = id_group";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getUsers(){
    global $server_connection;
    $data = "SELECT id_user FROM user";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getUserId($username){
    global $server_connection;
    $data = "SELECT id_user FROM user WHERE '$username' = username";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getUsername($id_user){
    global $server_connection;
    $data = "SELECT username FROM user WHERE '$id_user' = id_user";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getUserPassword($id_user){
    global $server_connection;
    $data = "SELECT userPassword FROM user WHERE '$id_user' = id_user";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getUserEmail($id_user){
    global $server_connection;
    $data = "SELECT email FROM user WHERE '$id_user' = id_user";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function getUserTeam($id_user){
    global $server_connection;
    $data = "SELECT team FROM user WHERE '$id_user' = id_user";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function isAdmin($id_user){
    global $server_connection;
    $data = "SELECT isadmin FROM user WHERE '$id_user' = id_user";
    $output = $server_connection->query($data);
    $output = $output->fetchAll();
    return $output;
}

function callFuction(){
    $objData = (object)[];
    $id = $_GET["id"];
    $info = $_GET["info"];
    if ($id == "getIdTeams"){
        $objData->data = getIdTeams();
    }
    else if ($id == "getTeamName"){
        $objData->data = getTeamName($info);
    }
    else if ($id == "getIdPlayers"){
        $objData->data = getIdPlayers();
    }
    else if ($id == "getPlayername"){
        $objData->data = getfullName($info);
    }
    else if ($id == "getTeamMembers"){
        $objData->data = getTeamMemmbers($info);
    }
    else if ($id == "getRefereesId"){
        $objData->data = getIdReferees();
    }
    else if ($id = "getRefereePlayerId"){
        $objData->data = getRefereePlayerId($info);
    }
    else if ($id == "getRefereeName"){
        $objData->data = getRefereeName($info);
    }
    else if ($id == "getFields"){
        $objData->data = getIdFields();
    }
    else if ($id == "getFieldname"){
        $objData->data = getFieldname($info);
    }
    else if ($id == "getGames"){
        $objData->data = getGames();
    }
    else if ($id == "getFieldNorth"){
        $objData->data = getFieldNorth($info);
    }
    else if ($id == "getFieldSouth"){
        $objData->data = getFieldSouth($info);
    }
    else if ($id == "getField"){
        $objData->data = getField($info);
    }
    else if ($id == "getFieldReferee"){
        $objData->data = getFieldreferee($info);
    }
    else if ($id == "getGroups"){
        $objData->data = getGroups();
    }
    else if ($id == "getGroupname"){
        $objData->data = getGroupname($info);
    }
    else if ($id == "getUsers"){
        $objData->data = getUsers();
    }
    else if ($id == "getUserId"){
        $objData->data = getUserId($info);
    }
    else if ($id == "getUsername"){
        $objData->data = getUsername($info);
    }
    else if ($id == "getUserpassword"){
        $objData->data = getUserPassword($info);
    }
    else if ($id == "getUserEmail"){
        $objData->data = getUserEmail($info);
    }
    else if ($id == "getUserTeam"){
        $objData->data = getUserTeam($info);
    }
    else{
        $objData->data = "no data";
    }
    
    echo (json_encode($objData));
}

?>