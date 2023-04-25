<!DOCTYPE html>

<html>

    <head>
        <title>Volleyball Nacht</title>

        <?php
            require_once("import.php");
        ?>
    </head>

    <body>
        <div id="resetDiv">
            <h1 class="title">My Team</h1>

            <div class="extended_button_placehodler leftside"><!--keine klasse-->
                <button class="logoutButton" id="logout_myteam" onclick="openMain()">log out</button>
            </div>


            <div class="extended_button_placehodler">
                <button class="button" id="home_my_team" onclick="openLogedin()">Home</button>
            </div>

            <div class="extended_button_placehodler">
                <button class="button" id="spielplan_buton_myTeam" onclick="openSpielplan()">Spielplan</button>
            </div>

            <div class="extended_button_placehodler leftside">
                <button class="logoutButton" onclick="removePlayer()">remove Player</button>
            </div>

            <div class="extended_button_placehodler leftside">
                <input class="inputElement" id="removeplayervorname" placeholder="vorname"></input><br>
                <input class="inputElement" id="removeplayernachname" placeholder="nachname"></input>
            </div>
            
            
            
 
            <div class="dynamic_list_placeholder">

                <div id="teamname_placeholder">
                    <div id="teamname"></div>

                    <button id="rename_team">
                    <!--img-->
                    </button>
                </div>

                <div id="addPlayerdiv"></div>

                <div class="extended_button_placehodler">
                    <button class="addPlayerButton button" id="addPlayer" onclick="openAddPlayerMenu()">add Player</button>
                </div>

                <div id="addPlayerButtondiv"></div>
            </div>
        </div>

        <script src="../handleRequest.js"></script>
        <script src="../importfunctions.js"></script>
        <script src="../myTeam.js"></script>
    </body>

    
</html>