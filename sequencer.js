class Sequencer {
	constructor() {
		this.audioContext = new AudioContext();
		this.timeInput = 4000;
		this.volume = this.audioContext.createGain();
		this.stop = true;
		this.elem = {};

		this.init();
	}

	init() {
		this.getElements();
		this.volume.gain.value = 0.25;
		this.volume.connect(this.audioContext.destination);

		this.addEvents();
	}

	getElements() {
		Object.assign(this.elem, {
			keys: document.querySelectorAll(".key"),
			playButton: document.getElementById("play"),
			clear: document.getElementById("clear"),
		});
	}

	addEvents() {
		this.elem.keys.forEach((key) =>
			key.addEventListener("click", (e) => this.keySelector(e))
		);

		this.elem.playButton.addEventListener("click", () =>
			this.playButtonClicked()
		);

		this.elem.clear.addEventListener("click", () => this.clearAll());
	}

	keySelector(e) {
		e.target.classList.toggle("selected");
		if (e.target.classList.contains("selected")) {
			this.noteOn(e.target.innerText);
		}
	}

	playButtonClicked() {
		this.elem.playButton.classList.toggle("on");

		if (this.elem.playButton.classList.contains("on")) {
			this.elem.playButton.innerText = "Stop";
			this.playAll();
		} else {
			this.elem.playButton.innerText = "Play";
		}
	}

	playAll() {
		if (!this.elem.playButton.classList.contains("on")) {
			return;
		}

		const sounds = Array.from(document.querySelectorAll(".selected"));

		for (let i = 0; i < sounds.length; i++) {
			setTimeout(() => {
				this.noteOn(sounds[i].innerText);
			}, i * 500);
		}

		setTimeout(() => {
			this.playAll();
		}, sounds.length * 500);
	}

	noteOn(note) {
		const sound = document.querySelector(`audio[data-key="${note}"]`);

		if (!sound) return;

		sound.currentTime = 0;
		sound.play();
	}

	clearAll() {
		this.elem.keys.forEach((key) => key.classList.remove("selected"));
	}
}

const seq = new Sequencer();
