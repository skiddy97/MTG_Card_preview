<img id="card__image" src="" alt="" />
<div class="card__info">
    <div class="card__header">
        <div class="card__title-container">
            <span id="card__title"></span>

            <?php if ($_SESSION["user"]) {
                echo '
								<button id="button__set-favorite"onclick="saveFavorite()">
								<span class="material-symbols-outlined">star</span>
								</button>';
            } ?>
            <br />
            <span id="card__type"></span><br />
        </div>
        <div class="card__stats invisible">
            <span id="card__mana"></span>
            <span id="card__angdef"></span>
            <img src="" id="card__set" />
        </div>
    </div>
    <div class="card__text">
        <p id="card__effect"></p>
        <p id="card__flavor"></p>
    </div>
</div>