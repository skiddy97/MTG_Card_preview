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
let cardSymbols;

async function fetchCard() {
	fetch("https://api.scryfall.com/cards/random")
		.then((response) => response.json())
		.then((data) => displayCard(data));
}
function displayCard(data) {
	createCardImage(data);
	createCardTitle(data);
	createCardEffect(data);
	createCardFlavorText(data);
	createCardMana(data);
	createCardType(data);
	createCardAngDef(data);
	createCardSet(data);
	createCardRarity(data);
}

function createCardImage(data) {
	cardImage.attr("src", data.image_uris.normal);
}

function createCardTitle(data) {
	cardTitle.text(data.name);
}

function createCardMana(data) {
	cardMana.html(replaceBrackets(data.mana_cost));
}

function createCardType(data) {
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
	cardSet.attr("src", data.set_uri);
}

function createCardEffect(data) {
	cardEffect.html(replaceBrackets(data.oracle_text));
}

function createCardFlavorText(data) {
	cardFlavor.text(data.flavor_text);
}

var reload = document.getElementById("fetchCard");
console.log(reload);
reload.addEventListener("click", fetchCard);
async function fetchCardSymbol() {
	fetch("https://api.scryfall.com/symbology ")
		.then((response) => response.json())
		.then((object) => object.data)
		.then((data) => {
			return (cardSymbols = data);
		});
}
function replaceSymbol(data) {}

fetchCardSymbol();

function replaceBrackets(string) {
	cardSymbols.forEach((element) => {
		string = string.replaceAll(
			element.symbol,
			'<span class="symbol__container"><img class="card__symbols"src="' +
				element.svg_uri +
				'"></span>'
		);
	});
	return string;
}
