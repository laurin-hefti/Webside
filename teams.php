<!DOCTYPE html>

<html>

    <head>
        <title>Volleyball Nacht</title>

        <?php
            require_once("import.php");
        ?>
    </head>

    <body>
        <h1 class="title">Teams</h1>

        <div class="extended_button_placehodler leftside"><!--keine klasse-->
            <button class="logoutButton" id="logout_teams" onclick="openMain()">log out</button>
        </div>

        <div class="button_placehodler">
            <Button class="button" onclick="openLehrer()">Home</button>
        </div>
        
        <div class="dynamic_list_placeholder">
            <div id="addTeamsdiv"></div>
        </div>
        

        <script src="importfunctions.js"></script>
        <script src="handleRequest.js"></script>
        <script src="teams.js"></script>
    </body>

    
</html>