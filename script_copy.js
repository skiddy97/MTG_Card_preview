var reload = document.getElementById("button__refresh-card");
var section = $(".main__section");
var cardImage = $("#card__image");
var cardHeader = $(".card__header");
var cardTitleContainer = $(".card__title-container");
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
var cardInfo = $(".card__info");
let cardSymbols;
let setSymbols;
let currentCardData;

//
//fetchCard();
fetchCardSymbol();
fetchSetSymbol();

// fetching data
async function fetchCard() {
	const response = await fetch("https://api.scryfall.com/cards/random");
	currentCardData = await response.json();
	displayCard(currentCardData);
}

async function fetchCardSymbol() {
	fetch("https://api.scryfall.com/symbology ")
		.then((response) => response.json())
		.then((object) => object.data)
		.then((data) => {
			return (cardSymbols = data);
		});
}
async function fetchSetSymbol() {
	fetch("https://api.scryfall.com/sets")
		.then((response) => response.json())
		.then((object) => object.data)
		.then((data) => {
			return (setSymbols = data);
		});
}

// assignment of fetched data
function assignCardImage(currentCardData) {
	cardImage.attr("src", currentCardData.image_uris.normal);
}

function assignCardTitle(currentCardData) {
	cardTitle.text(currentCardData.name);
	adjustFontSize(cardTitle);
}

function assignCardMana(currentCardData) {
	cardMana.html(replaceBrackets(currentCardData.mana_cost));
}

function assignCardType(currentCardData) {
	clearText(cardType);
	cardType.text(currentCardData.type_line);
}

function assignCardAngDef(currentCardData) {
	if (
		currentCardData.power !== undefined &&
		currentCardData.power !== undefined
	) {
		cardAngDef.text(
			`( ${currentCardData.power} / ${currentCardData.toughness} )`
		);
	} else {
		cardAngDef.text("");
	}
}

function assignCardSet(currentCardData) {
	cardSet.attr("src", replaceSetSymbol(currentCardData.set));
}

function assignCardEffect(currentCardData) {
	clearText(cardEffect);
	cardEffect.html(replaceBrackets(currentCardData.oracle_text));
}

function assignCardFlavorText(currentCardData) {
	clearText(cardFlavor);
	cardFlavor.text(currentCardData.flavor_text);
}

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

function replaceSetSymbol(set) {
	setSymbols.forEach((element) => {
		if (set === element.code) {
			set = element.icon_svg_uri;
			return;
		}
	});
	return set;
}

// handle card information
async function displayCard(currentCardData) {
	cardStats.removeClass("invisible");
	assignCardImage(currentCardData);
	assignCardTitle(currentCardData);
	assignCardEffect(currentCardData);
	assignCardFlavorText(currentCardData);
	assignCardMana(currentCardData);
	assignCardType(currentCardData);
	assignCardAngDef(currentCardData);
	assignCardSet(currentCardData);

	sendToBackend(currentCardData);
}

async function sendToBackend(currentCardData) {
	fetch("save_favorite.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(currentCardData),
	})
		.then((response) => response.json())
		.then((object) => object.data)
		.then((data) => console.log(data));
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
// refresh animation

async function cardLoad() {
	fetchCard();
	console.log(currentCardData);
}

reload.addEventListener("click", cardLoad);
