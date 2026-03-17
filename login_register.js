var exit = document.getElementById("button__exit");
var modal = document.getElementById("modal__background");
var loginSwitch = document.getElementById("login_switch");
var registerSwitch = document.getElementById("register_switch");
var input;

exit.addEventListener("click", () => {
	modal.style.display = "none";
});

function openModal() {
	modal.style.display = "block";
}

function showForm() {
	document.querySelectorAll(".switch").forEach((element) => {
		element.classList.remove("active");
	});
	event.currentTarget.classList.add("active");
	if (document.getElementById("switch_register").classList.contains("active")) {
		document.getElementById("form_login").classList.remove("active");
		document.getElementById("form_register").classList.add("active");
	} else {
		document.getElementById("form_register").classList.remove("active");
		document.getElementById("form_login").classList.add("active");
	}
}
