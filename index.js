// keys
const keySelector = (e) => {
	e.target.classList.toggle("selected");
	if (e.target.classList.contains("selected")) {
		noteOn(e);
	}
};

const keys = Array.from(document.querySelectorAll(".key"));

keys.forEach((key) => key.addEventListener("click", keySelector));

// play button
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

//audio
let context = null;
let sound = null;

const getOrCreateContext = () => {
	if (!context) {
		context = new AudioContext();
	}

	return context;
};

let isStarted = false;

const noteOn = (e) => {
	const note = document.querySelector(
		`audio[data-key="${e.target.innerText}"]`
	);

	if (!note) return;

	note.currentTime = 0;
	note.play();
};
