var Pitch;
var Volume;
var Envelope;
var Note;

function createPitchClass(aContext) {
    function Pitch(aFrequency){
	this.theOscillator = aContext.createOscillator();
	this.theOscillator.type = this.theOscillator.SINE;
	this.theOscillator.frequency.value = aFrequency;
	this.theInput = this.theOscillator;
	this.theOutput = this.theOscillator;
    };

    Pitch.prototype.start = function() {
	this.theOscillator.start(0);
    };

    Pitch.prototype.stop = function() {
	this.theOscillator.stop(0);
	this.theOscillator.disconnect();
    };

    Pitch.prototype.set = function(aFrequency) {
	this.theOscillator.frequency.setValueAtTime(aFrequency, aContext.currentTime);
    };

    Pitch.prototype.connect = function(aNode) {
	if (aNode.hasOwnProperty('theInput')) {
      	    this.theOutput.connect(aNode.theInput);
    	} else {
      	    this.theOutput.connect(aNode);
	}
    };

    return Pitch;
}

function createVolumeClass(aContext) {
    function Volume(){
	this.theGain = aContext.createGain();
	this.theGain.gain.value = 0;
	this.theAmplitude = this.theGain.gain;
	this.theInput = this.theGain;
	this.theOutput = this.theGain;
    };

    Volume.prototype.connect = function(aNode) {
	if (aNode.hasOwnProperty('theInput')) {
      	    this.theOutput.connect(aNode.theInput);
    	} else {
      	    this.theOutput.connect(aNode);
	}
    };

    return Volume;
}

function createEnvelopeClass(aContext) {
    function Envelope(aUp, aDown, aMax) {
	this.theUp = aUp;
	this.theDown = aDown;
	this.theMax = aMax;
    }

    Envelope.prototype.play = function() {
	if(this.theModulate) {
    	    myCurrTime = aContext.currentTime;
    	    this.theModulate.cancelScheduledValues(myCurrTime);
    	    this.theModulate.setValueAtTime(0, myCurrTime);
    	    this.theModulate.linearRampToValueAtTime(this.theMax, myCurrTime + this.theUp);
    	    this.theModulate.linearRampToValueAtTime(0, myCurrTime + this.theUp + this.theDown);
	}
    }

    Envelope.prototype.connect = function(aModulate) {
	this.theModulate = aModulate;
    }

    return Envelope;
}

function createNoteClass(aContext) {
    function Note(aFrequency) {
	this.thePitch = new Pitch(aFrequency);
	this.theVolume = new Volume();
	this.theEnvelope = new Envelope(0.05, 1.5, 5);
	this.thePitch.connect(this.theVolume);
	this.theEnvelope.connect(this.theVolume.theAmplitude);
	this.theVolume.connect(aContext.destination);
    }

    Note.prototype.play = function() {
	this.theEnvelope.play();
    }

    Note.prototype.setPitch = function(aPitch) {
	this.thePitch.set(aPitch);
    }

    Note.prototype.start = function() {
	this.thePitch.start();
    }

    Note.prototype.stop = function() {
	this.thePitch.stop();
    }

    return Note;
}

function initializeAudio() {
    try {
    	window.AudioContext = window.AudioContext||window.webkitAudioContext;
    	theContext = new AudioContext();
    	console.log("Context created");
	Pitch = new createPitchClass(theContext);
	Volume = new createVolumeClass(theContext);
	Envelope = new createEnvelopeClass(theContext);
	Note = new createNoteClass(theContext);
	console.log("Audio classes instantiated");
    } catch(e) {
    	alert('Web Audio API is not supported in this browser');
    }
}

