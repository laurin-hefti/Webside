<!DOCTYPE html>

<html>

    <head>
        <title>Login</title>

        <?php
            require_once("import.php");
        ?>
    </head>

    <body>
        <h1 class="title">Register</h1>
        
        <div class="button_placehodler">
            <button class="button" id="back2">back</button><br>
        </div>

        <div class="login_input">
            <input type="text" id="registerUsername" name="name" placeholder="Username" class="login_input_element"><br>
            <div class="errorPlaceholder" id="errorDivPlaceholderRegisterUsername"></div>
            <input type="password" id="registerPassword" name="password" placeholder="Password" class="login_input_element"><br>
            <div class="errorPlaceholder" id="errorDivPlaceholderRegisterPassword"></div>
            <input type="text" id="registerEmailadress" name="emailadresse" placeholder="Emailadresse", class="login_input_element"><br>
            <div class="errorPlaceholder" id="errorDivPlaceholderRegisterEmail"></div>
            <div class="confirme_placeholder">
                <button class="button" id="confirmRegister">confirm</button>
            </div>
        </div>

        <div class="button_placehodler">
            <button class="button" id="back_to_login">login</button>
        </div>

        <script src="importfunctions.js"></script>
        <script src="register.js"></script>
    </body>

    
</html>