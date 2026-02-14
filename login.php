<?php


session_start();
try {
    $pdo = new PDO('mysql:host=localhost;dbname=Magic_random_card', 'root', '');
} catch (PDOException $e) {
    echo 'Fehler:' . htmlspecialchars($e->getMessage());
    exit();
}
echo $pdo;
