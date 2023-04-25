<?php
function deletastFieldElement(){
    global $server_connection;
    $data = "DELETE FROM field ORDER BY id_field DESC LIMIT 1;";
    try {
        $server_connection->exec($data);
    }catch (PDOException $e) {
        echo "delet failed: " . $e->getMessage();
    }
}

function deletPlayer($id_player){
    global $server_connection;
    $data = "DELETE FROM player WHERE '$id_player' = id_player";
    try {
        $server_connection->exec($data);
    }catch (PDOException $e) {
        echo "delet failed: " . $e->getMessage();
    }
}

?>