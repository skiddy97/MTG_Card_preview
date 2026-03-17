<!DOCTYPE html>

<?php

session_start();
session_regenerate_id();

?>

<html lang="en">


<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">


    <title>Magic Randomizer – Favorites</title>
</head>

<body>

    <?php $_SESSION['favorite'] ?>
    <?php $activepage = "favorite" ?>
    <?php include_once "nav.php" ?>
    <?php include_once "modal_login_register.php" ?>

    <div class="page__wrapper">
    </div>
    <section class="section section__main">
        <div class="main__section gallery">
            <div class="gallery__card">

                <?php

                foreach ($_SESSION['favorites'] as $card) {
                    echo "<div class=\"sleeve\" ><img class=\"card__gallery\" src=\"" . $card["img"] . "\">
                   </div>";
                }
                ?>
            </div>
        </div>
    </section>
    <script src="jquery.js"></script>
    <script src="script.js"></script>
    <script src="card_viewer.js"></script>
    <script src="login_register.js"></script>
</body>

</html>