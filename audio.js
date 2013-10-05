var theContext
var theOscillator
var thePlaying = false

function initializeAudio() {
    try {
    	window.AudioContext = window.AudioContext||window.webkitAudioContext;
    	theContext = new AudioContext();
    	console.log("Context created");
    } catch(e) {
    	alert('Web Audio API is not supported in this browser');
    }
}

function simpleToneStart(aFrequency, aType, aGain) {
    if(theContext && !thePlaying) {
	myGain = theContext.createGainNode()
    	theOscillator = theContext.createOscillator()

    	theOscillator.frequency.value = aFrequency
	theOscillator.type = aType

    	theOscillator.connect(myGain)
    	myGain.connect(theContext.destination)

	myGain.gain.value = aGain
    	theOscillator.noteOn(0)
	thePlaying = true
    }
}

function simpleToneStop() {
    if(theContext && thePlaying) {
	theOscillator.noteOff(0);
	theOscillator.disconnect();
	thePlaying = false
    }
}
