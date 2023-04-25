<?php

function deletData() {
    global $server_connection;
    $disableForeignKeys = "SET foreign_key_checks = 0";
    $dropTableTeam = "DROP TABLE IF EXISTS team";
    $dropTablePlayer = "DROP TABLE IF EXISTS player";
    $dropTableReferee = "DROP TABLE IF EXISTS referee";
    $dropTableField = "DROP TABLE IF EXISTS field";
    $dropTableGame = "DROP TABLE IF EXISTS game";
    $dropTabelGroup = "DROP TABLE IF EXISTS teamsgroup";
    $dropTableUser = "DROP TABLE IF EXISTS user";
    //$dropallTables = "DROP TALE IF EXISTS *";
    $enableForeignKeys = "SET foreign_key_checks = 1";

    try {
        $server_connection->exec($disableForeignKeys);
        $server_connection->exec($dropTableTeam);
        $server_connection->exec($dropTablePlayer);
        $server_connection->exec($dropTableReferee);
        $server_connection->exec($dropTableField);
        $server_connection->exec($dropTableGame);
        $server_connection->exec($dropTabelGroup);
        //$server_connection->exec($dropallTables);
        $server_connection->exec($dropTableUser);
        $server_connection->exec($enableForeignKeys);
    
        //echo "Tabellen geloescht.<br>";
    } catch (PDOException $e) {
        echo "drop Table failed: " . $e->getMessage();
    }
}