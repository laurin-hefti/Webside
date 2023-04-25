<?php

function createTeam() {
    global $server_connection;
    $createTabeleTeam = "
        CREATE TABLE IF NOT EXISTS team(
        id_team INT AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        PRIMARY KEY(id_team)
    );";

    try{
        $server_connection->exec($createTabeleTeam);
        //echo "created table team<br>";
    } catch(PDOException $e) {
        echo "create Tabele team faild". $e->getMessage();
    }
}

function createPlayer() {
    global $server_connection;
    $createTabellePlayer = "
        CREATE TABLE IF NOT EXISTS player(
            id_player INT AUTO_INCREMENT,
            firstname VARCHAR(100) NOT NULL,
            lastname VARCHAR(100) NOT NULL,
            team INT NOT NULL,
            PRIMARY KEY(id_player),
            FOREIGN KEY (team) REFERENCES team(id_team)
    );";

    try{
        $server_connection->exec($createTabellePlayer);
        //echo "created table player<br>";
    } catch(PDOException $e) {
        echo "create Tabele player faild". $e->getMessage();
    }
}

function createReferee() {
    global $server_connection;
    $createTabelleReferee = "
        CREATE TABLE IF NOT EXISTS referee(
            id_referee INT AUTO_INCREMENT,
            player INT NOT NULL,
            PRIMARY KEY(id_referee),
            FOREIGN KEY (player) REFERENCES player(id_player)
    );";

    try{
        $server_connection->exec($createTabelleReferee);
        //echo "created table referee<br>";
    } catch(PDOException $e) {
        echo "create Tabele referee faild". $e->getMessage();
    }
}

function createField() {
    global $server_connection;
    $createTabelleField = "
        CREATE TABLE IF NOT EXISTS field(
            id_field INT AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            PRIMARY KEY (id_field)
    );";

    try{
        $server_connection->exec($createTabelleField);
        //echo "created table field<br>";
    } catch(PDOException $e) {
        echo "create Tabele field faild". $e->getMessage();
    }
}

function createGame() {
    global $server_connection;
    $createTabelleGame = "
        CREATE TABLE IF NOT EXISTS game(
            id_game INT AUTO_INCREMENT,
            time TIMESTAMP NOT NULL,
            fieldnorth INT NOT NULL,
            fieldsouth INT NOT NULL,
            field INT NOT NULL,
            referee INT NOT NULL,
            teamsGroup INT NOT NULL,
            PRIMARY KEY (id_game),
            FOREIGN KEY (fieldnorth) REFERENCES team(id_team),
            FOREIGN KEY (fieldsouth) REFERENCES team(id_team),
            FOREIGN KEY (field) REFERENCES field(id_field),
            FOREIGN KEY (referee) REFERENCES referee(id_referee),
            FOREIGN KEY (teamsGroup) REFERENCES teamsGroup(id_teamsGroup)
    );";

    try{
        $server_connection->exec($createTabelleGame);
        //echo "created game field<br>";
    } catch(PDOException $e) {
        echo "create Tabele game faild". $e->getMessage();
    }
}

function createGroup(){
    global $server_connection;
    $createTabelleGroup = "
    CREATE TABLE IF NOT EXISTS teamsGroup(
        id_teamsGroup INT AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        PRIMARY KEY (id_teamsGroup)
    );";

    try{
        $server_connection->exec($createTabelleGroup);
        //echo "created group field<br>";
    } catch(PDOException $e) {
        echo "create Tabele group faild". $e->getMessage();
    }
}

function createUser(){
    global $server_connection;
    $createTabelleUser = "
    CREATE TABLE IF NOT EXISTS user(
        id_user INT AUTO_INCREMENT,
        username VARCHAR(100) NOT NULL,
        userPassword VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        team INT,
        isadmin INT,
        PRIMARY KEY (id_user)
    );";
    //FOREIGN KEY (team) REFERENCES team(id_team)
    try{
        $server_connection->exec($createTabelleUser);
        //echo "created user field<br>";
    } catch(PDOException $e) {
        echo "create Tabele user faild". $e->getMessage();
    }
}

function createall() {
    createTeam();
    createPlayer();
    createReferee();
    createField();
    createGame();
    createGroup();
    createUser();
}



?>
