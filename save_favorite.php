<?php

session_start();
session_regenerate_id();
include_once 'config.php';

$json = file_get_contents('php://input'); // Liest die Rohdaten der Anfrage
$currentCardData = json_decode($json, true); // Dekodiert den JSON-String in ein PHP-Array

if ($currentCardData === null || !isset($currentCardData)) {
    exit("Ungültige Daten gesendet!");
}

$pdo = new PDO($dsn, $db_user, $db_pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$userid = $_SESSION['user_id'];

try {


    $sqlcard = 'SELECT COUNT(*) FROM cards where card_id = :card_id';
    $stmtcard = $pdo->prepare($sqlcard);
    $stmtcard->bindParam(':card_id', $currentCardData['id']);
    $stmtcard->execute();

    if ($stmtcard->fetchColumn() == 0) {
        $sqlcard = 'INSERT INTO cards (card_id, card_name, card_power, card_toughness, card_cost, card_img_normal, card_object ) VALUES (:card_id, :card_name, :card_power, :card_toughness, :card_cost, :card_img_normal, :card_object)';
        $stmtcard = $pdo->prepare($sqlcard);
        $stmtcard->bindParam('card_id', $currentCardData['id']);
        $stmtcard->bindParam('card_name', $currentCardData['name']);
        $stmtcard->bindParam('card_power', $currentCardData['power']);
        $stmtcard->bindParam('card_toughness', $currentCardData['toughness']);
        $stmtcard->bindParam('card_cost', $currentCardData['cmc']);
        $stmtcard->bindValue(':card_img_normal', $currentCardData['image_uris']['normal'], PDO::PARAM_STR);
        $stmtcard->bindParam('card_object', $json);
        $stmtcard->execute();
    }

    $sqlfavorite = 'SELECT COUNT(*) FROM favorite_cards where card_id = :card_id AND user_id = :user_id';
    $stmtfavorite = $pdo->prepare($sqlfavorite);
    $stmtfavorite->bindParam(':card_id', $currentCardData['id']);
    $stmtfavorite->bindParam(':user_id', $userid);
    $stmtfavorite->execute();

    if ($stmtfavorite->fetchColumn() == 0) {

        $sqlfavorite = 'INSERT INTO favorite_cards (card_id, user_id) VALUES (:card_id, :user_id)';
        $stmtfavorite = $pdo->prepare($sqlfavorite);
        $stmtfavorite->bindParam('card_id', $currentCardData['id']);
        $stmtfavorite->bindParam('user_id', $userid);
        $stmtfavorite->execute();
        $_SESSION['favorites'][] = [
            'id' => $currentCardData['id'],
            'name' => $currentCardData['name'],
            'img' => $currentCardData['image_uris']['normal']
        ];
    }
} catch (PDOException $e) {
    exit("irgendwas hat nicht geklappt");
}
header("location: http://localhost");

// header('Content-Type: application/json'); // Setzt den Content-Type auf JSON
// echo json_encode(['success' => true, 'data' => $currentCardData]); // Gibt ein JSON-Objekt zurück
