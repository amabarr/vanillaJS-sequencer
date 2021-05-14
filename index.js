const keySelector = (e) => {
	e.target.classList.toggle("selected");
};

const keys = Array.from(document.querySelectorAll(".key"));

keys.forEach((key) => key.addEventListener("click", keySelector));

const playButton = document.getElementById("play");

const playButtonClicked = (e) => {
	playButton.classList.toggle("on");

	if (playButton.classList.contains("on")) {
		playButton.innerText = "Stop";
	} else {
		playButton.innerText = "Play";
	}
};

playButton.addEventListener("click", playButtonClicked);
