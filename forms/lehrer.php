<!DOCTYPE html>

<html>

    <head>
        <title>Volleyball Nacht</title>

        <?php
            require_once("import.php");
        ?>
    </head>

    <body>
        <h1 class="title">Lehrer</h1>

        <div class="extended_button_placehodler leftside">
            <Button class="logoutButton" onclick="openMain()">Log out</button>
        </div>

        <div class="button_placehodler">
            <Button class="button" onclick="openTeams()">Teams</button>
        </div>

        <div class="button_placehodler">
            <button class="button" onclick="openSpielplan2()">Spielplan</button>
        </div>

        

        <script src="../importfunctions.js"></script>
        <script src="../lehrer.js"></script>
    </body>

    
</html>