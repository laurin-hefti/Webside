<!DOCTYPE html>

<html>

    <head>
        <title>Login</title>

        <?php
            require_once("import.php");
        ?>
    </head>

    <body>
        <h1 class="title">Login</h1>

        <div class="button_placehodler">
            <button class="button" id="back">back</button><br>
        </div>
        

        <div class="login_input">
            <input type="text" id="loginName" name="name" placeholder="Username" class="login_input_element"><br>
            <div class="errorPlaceholder" id="errorDivPlaceholderLoginUsername"></div>
            <input type="password" id="loginPassword" name="password" placeholder="password" class="login_input_element"><br>
            <div class="errorPlaceholder" id="errorDivPlaceholderLoginPassword"></div>

            <div class="confirme_placeholder">
                <button class="button" id="confirmLogin">confirm</button> <!--onclick function-->
            </div>
        </div>

        <div onclick="" class="button_placehodler"> <!--in the atribut you can write javascript-->
            <button class="button" id="register">register</button>
        </div>
        
        <script src="importfunctions.js"></script>
        <script src="login.js"></script>
    </body>

    
</html>