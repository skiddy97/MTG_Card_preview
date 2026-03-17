<?php
$currentPage = basename($_SERVER['REQUEST_URI']);
function isActive($page)
{
    $currentPage = basename($_SERVER['REQUEST_URI']);
    return ($currentPage == $page)  ? 'navlink__active ' : '';
}
echo $currentPage;
?>

<nav>
    <ul class="navigation_menu">

        <li><a href="index.php" class="<?= isActive("index.php") ?> <?= isActive("") ?> button__navmenu"><span class="material-symbols-outlined">home</span></a></li>
        <li><a href="favorites.php" class="<?= isActive("favorites.php") ?>button__navmenu"><span class="material-symbols-outlined">star</span></a></li>

        <?php if ($_SESSION["user_id"]) {
            echo "<li id=\"button__logout\" ><a href=\"logout.php\" class=\"logout button__navmenu\"><span class=\"material-symbols-outlined\">logout</span></a>
            </li>";
        } else {
            echo "<li id=\"button__sign-in\"><a class=\"sign-in button__navmenu\" onclick=\"openModal()\"><span>sign in</span></a></li>";
        } ?>



    </ul>
</nav>