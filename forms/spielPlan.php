<!DOCTYPE html>

<html>

    <head>
        <title>Volleyball Nacht</title>

        <?php
            require_once("import.php");
        ?>
    </head>

    <body>
        <h1 class="title">Spielplan</h1>

        <div class="extended_button_placehodler leftside">
            <button class="logoutButton" id="logout_spielPlan" onclick="openMain()">log out</button><!--muss nocht initialisiert werden-->
        </div>

        <div class="extended_button_placehodler">
            <button class="button" id="home_spielPlan" onclick="openLogedin()">Home</button><!--muss nocht initialisiert werden-->
        </div>

        <div class="extended_button_placehodler">
            <button class="button" id="my_team_buton_spielPlan" onclick="openmyTeam()">My Team</button>
        </div>

        <script src="../importfunctions.js"></script>
        <script src="../scrpts.js"></script>
    </body>

    
</html>