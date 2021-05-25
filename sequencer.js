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
		this.stop = !this.stop;

		if (!this.stop) {
			this.elem.playButton.innerText = "Stop";
			this.playAll(this.timeInput);
		} else {
			this.elem.playButton.innerText = "Play";
		}
	}

	playAll(time) {
		if (this.stop) {
			return;
		}

		const sounds = this.getSequence();

		for (let i = 0; i < sounds.length; i++) {
			setTimeout(() => {
				this.playPoly(sounds[i]);
			}, (i * this.timeInput) / 6);
		}

		setTimeout(() => {
			this.playAll(this.timeInput);
		}, time);
	}

	playPoly(notes) {
		for (let i = 0; i < notes.length; i++) {
			this.noteOn(notes[i]);
		}
	}

	noteOn(note) {
		const sound = document.querySelector(`audio[data-key="${note}"]`);

		if (!sound) return;

		sound.currentTime = 0;
		sound.play();
	}

	clearAll() {
		this.stop = true;
		this.elem.playButton.innerText = "Play";
		this.elem.keys.forEach((key) => key.classList.remove("selected"));
	}

	getSequence() {
		const sounds = new Array(6).fill(null).map((val) => []);
		const keys = this.elem.keys;

		for (let i = 0; i < sounds.length; i++) {
			let col = sounds[i];
			let j = i * 6;
			let count = 0;
			while (count <= 5) {
				if (keys[j].classList.contains("selected")) {
					col.push(keys[j].innerText);
				}

				j++;
				count++;
			}
		}

		return sounds;
	}
}

const seq = new Sequencer();
