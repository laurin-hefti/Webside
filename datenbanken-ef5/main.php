<?php

$servername = "aropawoz.mysql.db.internal";
$username = "aropawoz_laurin";
$password = "zsQvr6FN6LLb*+=T?1Pf";

try{
    $server_connection = new PDO("mysql:host=".$servername."; dbname=aropawoz_volleyball", $username, $password);
    $server_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "connected"."<br>";   
} catch(PDOExeption $e) {
    echo "connaction fild" .$e -> getMessage();
}

include "create.php";
include "insert.php";
include "delet.php";
include "getData.php";

createall();

//deletData();

//createall();

//readData();

//header("Location: inputform.html", true, 301);
?>