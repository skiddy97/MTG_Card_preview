async function fetchCard() {
	setTimeout(() => {
		fetch("https://api.scryfall.com/cards/random")
			.then((response) => response.json())
			.then((data) => displayCard(data));
	}, "500");
}
function displayCard(data) {
	createLayout(data);
}

function createLayout(data) {
	const card = $("<img>").addClass("black");
	card.attr("src", data.image_uris.normal);
	$("body").append(card);
}

fetchCard();
