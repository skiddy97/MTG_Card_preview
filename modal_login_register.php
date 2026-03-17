<div id="modal__background">
    <div class="modal">
        <div class="login_register_switch">

            <button onclick="showForm()" class="switch active" id="switch_login">
                einloggen
            </button>
            <button onclick="showForm()" class="switch" id="switch_register">
                registrieren
            </button>
            <button id="button__exit"><span class="material-symbols-outlined">
                    close
                </span></button>
        </div>

        <form action="login.php" class="form_login form active" method="POST" id="form_login">
            <h2 class="form__title">Login</h2>
            <input type="text" name="email" placeholder="E-Mail" required /><br />
            <input
                type="password"
                name="password"
                id=""
                placeholder="Passwort" /><br />
            <button type="submit">einloggen</button><br />
            <a href="#">passwort vergessen?</a><br />
        </form>

        <form action="register.php" class="form_register form" id="form_register" method="POST">
            <h2 class="form__title">Register</h2>
            <input type="text" placeholder="E-Mail" name="email" required /><br />
            <input
                type="password"
                name="password"
                id=""
                placeholder="Passwort" /><br />
            <input
                type="password"
                name="password_rep"
                id=""
                placeholder="Passwort wiederholen"
                required /><br />
            <button type="submit">registrieren</button><br />


        </form>
    </div>
</div>