var section = $(".main__section");
var cardImage = $("#card__image");
var cardHeader = $(".card__header");
var cardTitle = $("#card__title");
var cardEffect = $("#card__effect");
var cardFlavor = $("#card__flavor");
var cardSet = $("#card__set");
var cardType = $("#card__type");
var cardMana = $("#card__mana");
var cardRarity = $("#card__rarity");
var cardAngDef = $("#card__angdef");
var cardText = $("#card__text");
var cardStats = $(".card__stats");
let cardSymbols;
let setSymbols;

async function fetchCard() {
	fetch("https://api.scryfall.com/cards/random")
		.then((response) => response.json())
		.then((data) => displayCard(data));
}
function displayCard(data) {
	cardStats.removeClass("invisible");

	createCardImage(data);
	createCardTitle(data);
	createCardEffect(data);
	createCardFlavorText(data);
	createCardMana(data);
	createCardType(data);
	createCardAngDef(data);
	createCardSet(data);
}

function createCardImage(data) {
	cardImage.attr("src", data.image_uris.normal);
}

function createCardTitle(data) {
	cardTitle.text(data.name);
	adjustFontSize(cardTitle);
}

function createCardMana(data) {
	cardMana.html(replaceBrackets(data.mana_cost));
}

function createCardType(data) {
	clearText(cardType);
	cardType.text(data.type_line);
}

function createCardAngDef(data) {
	if (data.power !== undefined && data.power !== undefined) {
		cardAngDef.text(`( ${data.power} / ${data.toughness} )`);
	} else {
		cardAngDef.text("");
	}
}

function createCardSet(data) {
	cardSet.attr("src", replaceSetSymbol(data.set));
}

function createCardEffect(data) {
	clearText(cardEffect);
	cardEffect.html(replaceBrackets(data.oracle_text));
}

function createCardFlavorText(data) {
	clearText(cardFlavor);
	cardFlavor.text(data.flavor_text);
}

var reload = document.getElementById("fetchCard");

async function fetchCardSymbol() {
	fetch("https://api.scryfall.com/symbology ")
		.then((response) => response.json())
		.then((object) => object.data)
		.then((data) => {
			return (cardSymbols = data);
		});
}

fetchCard();
fetchCardSymbol();
fetchSetSymbol();

function replaceBrackets(string) {
	cardSymbols.forEach((element) => {
		string = string.replaceAll(
			element.symbol,
			'<span class="symbol__container"><img class="card__symbol"src="' +
				element.svg_uri +
				'"></span>'
		);
	});
	string = string.replaceAll(/\n/g, "<br>");
	return string;
}
async function fetchSetSymbol() {
	fetch("https://api.scryfall.com/sets")
		.then((response) => response.json())
		.then((object) => object.data)
		.then((data) => {
			return (setSymbols = data);
		});
}

function replaceSetSymbol(set) {
	setSymbols.forEach((element) => {
		if (set === element.code) {
			set = element.icon_svg_uri;
			return;
		}
	});
	return set;
}
async function reloadAnimation() {
	cardImage.removeClass("animation__fade-in");
	cardImage.addClass("animation__fade-out");
	fetchCard();
	setTimeout(() => {
		cardImage.removeClass("animation__fade-out");
		cardImage.addClass("animation__fade-in");
	}, 1000);
}

function clearText(element) {
	element = element.html("").text("");
}
function adjustFontSize(element) {
	element.removeClass("title-small");
	element.removeClass("title-large");
	if (cardTitle.text().length > 15) {
		cardTitle.addClass("title-small");
	} else {
		cardTitle.addClass("title-large");
	}
}

reload.addEventListener("click", reloadAnimation);
