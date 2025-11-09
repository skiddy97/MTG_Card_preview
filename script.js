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
//
//fetchCard();
fetchCardSymbol();
fetchSetSymbol();

// fetching data
async function fetchCard() {
	fetch("https://api.scryfall.com/cards/random")
		.then((response) => response.json())
		.then((data) => displayCard(data));
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
function assignCardImage(data) {
	cardImage.attr("src", data.image_uris.normal);
}

function assignCardTitle(data) {
	cardTitle.text(data.name);
	adjustFontSize(cardTitle);

	animationAppear(cardTitle, "animation__fade-in-top");
}

function assignCardMana(data) {
	cardMana.html(replaceBrackets(data.mana_cost));
}

function assignCardType(data) {
	clearText(cardType);
	cardType.text(data.type_line);
}

function assignCardAngDef(data) {
	if (data.power !== undefined && data.power !== undefined) {
		cardAngDef.text(`( ${data.power} / ${data.toughness} )`);
	} else {
		cardAngDef.text("");
	}
}

function assignCardSet(data) {
	cardSet.attr("src", replaceSetSymbol(data.set));
}

function assignCardEffect(data) {
	clearText(cardEffect);
	cardEffect.html(replaceBrackets(data.oracle_text));
}

function assignCardFlavorText(data) {
	clearText(cardFlavor);
	cardFlavor.text(data.flavor_text);
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

// displaying card and information
async function displayCard(data) {
	cardStats.removeClass("invisible");
	assignCardImage(data);
	assignCardTitle(data);
	assignCardEffect(data);
	assignCardFlavorText(data);
	assignCardMana(data);
	assignCardType(data);
	assignCardAngDef(data);
	assignCardSet(data);
	clearClasses(cardTitle);
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

function animationVanish(element, className) {
	return new Promise((resolve) => {
		element.addClass(className);
		element.one("animationend", () => {
			resolve();
		});
	});
}
function animationAppear(element, className) {
	return new Promise((resolve) => {
		element.addClass(className);
		element.one("animationend", () => {
			resolve();
		});
	});
}

async function clearClasses(...elements) {
	return new Promise((resolve) => {
		elements.forEach((element) => {
			element.removeClass("animation__fade-out-top");
			element.removeClass("animation__fade-out-right");
			element.removeClass("animation__fade-in-top");
			element.removeClass("animation__fade-in-right");
			resolve();
		});
	});
}

async function cardLoad() {
	fetchCard();
}

reload.addEventListener("click", cardLoad);
