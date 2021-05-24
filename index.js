// keys
const keySelector = (e) => {
	e.target.classList.toggle("selected");
	if (e.target.classList.contains("selected")) {
		noteOn(e.target.innerText);
	}
};

const keys = Array.from(document.querySelectorAll(".key"));

keys.forEach((key) => key.addEventListener("click", keySelector));

// play button
const playButton = document.getElementById("play");

const playAll = () => {
	if (!playButton.classList.contains("on")) {
		return;
	}

	const sounds = Array.from(document.querySelectorAll(".selected"));

	for (let i = 0; i < sounds.length; i++) {
		setTimeout(() => {
			noteOn(sounds[i].innerText);
		}, i * 500);
	}

	setTimeout(() => {
		playAll();
	}, sounds.length * 500);
};

const playButtonClicked = (e) => {
	playButton.classList.toggle("on");

	if (playButton.classList.contains("on")) {
		playButton.innerText = "Stop";
		playAll();
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

const noteOn = (note) => {
	const sound = document.querySelector(`audio[data-key="${note}"]`);

	if (!sound) return;

	sound.currentTime = 0;
	sound.play();
};

// clear button
const clearAll = () => {
	keys.forEach((key) => key.classList.remove("selected"));
};

const clearButton = document.getElementById("clear");

clearButton.addEventListener("click", clearAll);
