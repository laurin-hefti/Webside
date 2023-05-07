<!DOCTYPE html>

<html>

    <head>
        <title>Volleyball Nacht</title>

        <?php
            require_once("import.php");
        ?>
    </head>

    <body>
        <div class="extended_button_placehodler leftside">
            <button class="logoutButton" id="logout" onclick="openMain()">log out</button>
        </div>

        <div class="extended_button_placehodler">
            <button class="button" id="my_team_buton" onclick="openmyTeam()">My Team</button>
        </div>

        <div class="extended_button_placehodler">
            <button class="button" id="spielplan_buton" onclick="openSpielplan()">Spielplan</button>
        </div>

        <script src="importfunctions.js"></script>
    </body>

    
</html>