<?php

session_start();
session_regenerate_id();
include_once "config.php";

$json = file_get_contents('php://input'); // Liest die Rohdaten der Anfrage
$currentCardData = json_decode($json, true); // Dekodiert den JSON-String in ein PHP-Array

try {
    $pdo = new PDO($dsn, $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM favorite_cards WHERE cards_id = :cards_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':card_id', $currentCardData['id']);
    $stmt->execute();
    $result = $stmt->fetch();

    if (!$stmt->rowCount() === 1) {
        exit("keine Karte gespeichert");
    }
    $_SESSION[] = $currentCardData['id'];
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

header('Content-Type: application/json'); // Setzt den Content-Type auf JSON
echo json_encode(['success' => true, 'data' => $currentCardData]); // Gibt ein JSON-Objekt zurück
