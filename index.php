<?php

session_start();
session_regenerate_id();

?>

<!DOCTYPE html>
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


	<title>Magic Randomizer</title>
</head>

<body>

	<?php $activepage = "home" ?>

	<?php include_once "nav.php" ?>

	<?php include_once "modal_login_register.php" ?>
	<div class="page__wrapper">
	</div>
	<section class="section section__main">
		<div class=" main__section card__display"><?php include_once "card_display.php" ?></div>
		<button id="button__refresh-card">Neue Karte</button>
	</section>

	<script src="jquery.js"></script>
	<script src="script.js"></script>
	<script src="login_register.js"></script>
	</div>
</body>

</html>