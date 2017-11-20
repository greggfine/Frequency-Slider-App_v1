const audioCtx = new window.AudioContext();

var osc = false;
var startButton = document.getElementById('startButton');
var freqSlider = document.getElementById('range');
var frequencyDisplay = document.getElementById('frequencyDisplay');

var play = function() {
	var filter = audioCtx.createBiquadFilter();
	var amp = audioCtx.createGain();

	if (!osc) {
	osc = audioCtx.createOscillator();
	osc.type = "sawtooth";
	osc.connect(filter);
	filter.connect(amp);
	
	setInterval(function() {
		filter.frequency.value = freqSlider.value * 200;
		frequencyDisplay.textContent = freqSlider.value * 200;
	}, 50)

	amp.connect(audioCtx.destination);

	osc.start(audioCtx.currentTime);
	startButton.textContent = "Stop Oscillator"
	} else {
		osc.stop(audioCtx.currentTime);
		osc = false;
		startButton.textContent = "Start Oscillator"
	}
}

