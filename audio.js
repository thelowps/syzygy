var theContext

function initializeAudio() {
    try {
    	window.AudioContext = window.AudioContext||window.webkitAudioContext;
    	theContext = new AudioContext();
    	console.log("Context created");
    } catch(e) {
    	alert('Web Audio API is not supported in this browser');
    }
}

function simpleTone() {
    if(theContext) {
	myGain = theContext.createGainNode()
    	myOscillator = theContext.createOscillator()

    	myOscillator.frequency.value = 200
	myOscillator.type = 3

    	myOscillator.connect(myGain)
    	myGain.connect(theContext.destination)

	myGain.gain.value = 5
    	myOscillator.noteOn(0)
    }
}
