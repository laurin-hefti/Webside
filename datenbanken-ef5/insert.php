<?php

function insertDataTeam($name) {
    global $server_connection;
    $insert = "
    INSERT INTO team(name)
        VALUES ('$name');";

    try {
        $server_connection->exec($insert);
        //echo "Daten eingefügt.<br>";
    }catch (PDOException $e) {
        echo "Insertion failed: " . $e->getMessage();
    }
}

function insertDataPlayer($firstname, $lastname, $team) {
    global $server_connection;
    $insert = "
    INSERT INTO player(firstname, lastname, team)
        VALUES ('$firstname', '$lastname', '$team');";

    try {
        $server_connection->exec($insert);
        //echo "Daten eingefügt.<br>";
    } catch (PDOException $e) {
        echo "Insertion failed: " . $e->getMessage();
    }
}

function insertDataReferee($player) {
    global $server_connection;
    $insert = "
    INSERT INTO referee(player)
        VALUES ('$player');";

    try {
        $server_connection->exec($insert);
        //echo "Daten eingefügt.<br>";
    }catch (PDOException $e) {
        echo "Insertion failed: " . $e->getMessage();
    }
}

function insertDataField($name) {
    global $server_connection;
    $insert = "
    INSERT INTO field(name)
        VALUES ('$name');";

    try {
        $server_connection->exec($insert);
        //echo "Daten eingefügt.<br>";
    }catch (PDOException $e) {
        echo "Insertion failed: " . $e->getMessage();
    }
}

function insertDataGame($time, $fieldnorth, $fieldsouth, $field, $referee, $group) {
    global $server_connection;
    $insert = "
    INSERT INTO game(time, fieldnorth, fieldsout, field, referee, group)
        VALUES ('$time', '$fieldnorth','$fieldsouth','$field','$referee','$group');";

    try {
        $server_connection->exec($insert);
        //echo "Daten eingefügt.<br>";
    }catch (PDOException $e) {
        echo "Insertion failed: " . $e->getMessage();
    }
}

function insertDataGroup($name) {
    global $server_connection;
    $insert = "
    INSERT INTO group(name)
        VALUES ('$name');";

    try {
        $server_connection->exec($insert);
        //echo "Daten eingefügt.<br>";
    }catch (PDOException $e) {
        echo "Insertion failed: " . $e->getMessage();
    }
}

function insertDataUser($username, $password, $email, $team, $admin){
    global $server_connection;
    $insert = "
    INSERT INTO user(username, userPassword, email, team, isadmin)            
        VALUES ('$username', '$password', '$email', '$team', '$admin');"; // id team wird später hinzugefügt
    
    try {
        $server_connection->exec($insert);
        //echo "Daten eingefügt.<br>";
        return 1;
    }catch (PDOException $e) {
        echo "Insertion failed: " . $e->getMessage();
    }
}


?>