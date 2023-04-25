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
            <Button class="logoutButton" onclick="openMain()">Log out</button>
        </div>

        <div class="button_placehodler">
            <Button class="button" onclick="openLehrer()">Home</button>
        </div>
        
        <div class="bigPlaceholder">
            <div class="displayDataPlaceholder">
                <div class="reihe" id="displayDataTeams">Teams</div>
                <div class="reihe" id="displayDataPlayers">Spieler</div>
                <div class="reihe" id="displayDataReferees">Schiedsrichter</div>
                <div class="reihe" id="displayDataFields">Felder</div>
            </div>
        </div>

        <div class="bigPlaceholder">
            <div id="addFieldPlaceholder">Feldercontrol
                <br>
                <div class="buttonsetPlaceholder">
                    <button class="standartButton" id="addField" onclick=addField()>+</button>
                    <button class="standartButton" id="removeField" onclick=removeField()>-</button>
                </div>
            </div>
        </div>

        <button id="openGroupPanel" onclick=openMenueButton()>Gruppen Konfugurieren</button>
        <div id="group_manager"></div>

        <script src="../importfunctions.js"></script>
        <script src="../handleRequest.js"></script>
        <script src="../compiler.js"></script>
        <script src="../spielPlan2.js"></script>
    </body>

    
</html>