var cardModel = document.getElementsByClassName("card__gallery");
var cardSleeve = document.getElementsByClassName("sleeve");

for (var i = 0; i < cardModel.length; i++) {
	cardModel[i].addEventListener("mousemove", mousemove);
	cardModel[i].addEventListener("mouseenter", mouseenter);
	cardModel[i].addEventListener("mouseleave", mouseleave);
}
function mousemove(event) {
	halfWidth = this.getBoundingClientRect().width / 2;
	halfHeight = this.getBoundingClientRect().height / 2;

	positionX =
		Math.floor(event.clientX - this.getBoundingClientRect().left) / halfWidth -
		1;
	positionY =
		(-1 * Math.floor(event.clientY - this.getBoundingClientRect().top)) /
			halfHeight +
		1;

	this.style.transform =
		"rotateX(" +
		positionY * -20 +
		"deg) rotateY(" +
		positionX * -20 +
		"deg) scale(1.3)";
	console.log("position X = " + positionX + "\n" + "position Y = " + positionY);
}

function mouseenter() {
	this.style.transform =
		"rotateX(" +
		positionY * -20 +
		"deg) rotateY(" +
		positionX * -20 +
		"deg) scale(1.3)";
}
function mouseleave() {
	this.style.transform = "";
}
