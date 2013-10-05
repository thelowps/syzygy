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

function simpleTone(aFrequency, aType, aGain) {
    if(theContext) {
	console.log("Playing tone.");
	myGain = theContext.createGainNode()
    	myOscillator = theContext.createOscillator()

    	myOscillator.frequency.value = aFrequency
	myOscillator.type = aType

    	myOscillator.connect(myGain)
    	myGain.connect(theContext.destination)

	myGain.gain.value = aGain
    	myOscillator.noteOn(0)
    }
}
