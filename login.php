<?php


session_start();
session_regenerate_id();

include_once "config.php";
$pdo = new PDO($dsn, $db_user, $db_pass);

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $email = $_POST["email"];
        $password = $_POST["password"];
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("E-Mail ist ungültig!");
    }

    if (
        !isset($_POST["email"]) || !$_POST["email"] ||
        !isset($_POST["password"]) || !$_POST["password"]
    ) {
        exit("Eingaben sind ungültig!");
    }

    $sql = "SELECT * FROM user WHERE user_email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam("email", $email, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetch();
    //hier weitermachen -> wenn genau 1 ergebnis vorliegt, schauen ob hashed passwort dazu passt.

    if ($stmt->rowCount() !== 1) {
        exit("E-Mail-Adresse nicht vorhanden.");
    }
    if (!password_verify($password, $result["user_password_hash"])) {
        exit("Passwort ist falsch.");
    }


    $_SESSION["user"] = $email;
    $_SESSION["user_id"] = $result['user_id'];
    include_once "get_favorites.php";
    header("location: http://localhost");
} catch (Exception $e) {
    echo $e->getMessage();
}
