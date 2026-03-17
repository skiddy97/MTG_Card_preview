<?php

include_once "config.php";
$pdo = new PDO($dsn, $db_user, $db_pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sqlfavorite = "SELECT cards.card_id, card_name, card_img_normal  FROM cards JOIN favorite_cards ON cards.card_id = favorite_cards.card_id WHERE user_id = :user_id";
$stmtfavorite = $pdo->prepare($sqlfavorite);
$stmtfavorite->bindParam(":user_id", $_SESSION['user_id']);
$stmtfavorite->execute();

while ($row = $stmtfavorite->fetch(PDO::FETCH_ASSOC)) {

    $_SESSION['favorites'][] = [
        'id' => $row['card_id'],
        'name' => $row['card_name'],
        'img' => $row['card_img_normal'],
    ];;
}
