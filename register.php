<?php

session_start();
session_regenerate_id();

include_once "config.php";
$pdo = new PDO($dsn, $db_user, $db_pass);

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $password = $_POST["password"];
        $password_rep = $_POST["password_rep"];
        $email = $_POST["email"];
    }

    if (
        !isset($_POST["email"]) || !$_POST["email"] ||
        !isset($_POST["password"]) || !$_POST["password"] ||
        !isset($_POST["password_rep"]) || !$_POST["password_rep"]
    ) {
        exit("eingaben sind nicht alle angekommen");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("Mail ist ungültig");
    }

    if ($password !== $password_rep) {
        exit("Passwörter müssen beide gleich sein");
    }





    $sql = "SELECT * FROM user WHERE user_email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam("email", $email, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetch();
    print_r($result);



    if ($stmt->rowCount() > 0) {
        exit("Account mit dieser E-Mail existiert bereits.");
    }
    $password = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO user (user_email, user_password_hash, user_type) VALUES (:email, :password, 0)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam('email', $email,  PDO::PARAM_STR);
    $stmt->bindParam('password', $password,  PDO::PARAM_STR);
    $stmt->execute();
    $_SESSION["user"] = $email;
    $_SESSION["user_id"] = $result['user_id'];
    header("location: http://localhost");
} catch (Exception $e) {
    echo $e->getMessage();
}
/*

AUFBAU

REGISTRIERUNG

Eingaben bereinigen
EMAIL Eingabe validieren – 
EMAIL abgleichen mit Datenbank
Passwort und Passwort2 vergleichen
Passwort hash erstellen
EMAIL und PASSWORD_HASH in Datenbank abspeichern

LOGIN


*/