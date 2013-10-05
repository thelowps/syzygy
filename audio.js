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
  console.log(theContext);
  if(theContext) {
    myOscillator = theContext.createOscillator();
    myOscillator.frequency.value = 200;
    myOscillator.connect(theContext.destination);
    myOscillator.start(0);
  }
}
