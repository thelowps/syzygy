// PLANET CONTSTRUCTOR
function Planet (P) {
    
}

$(document).ready(function () {
    
    initializeAudio()
    var myNote = new Note(440);
    myNote.start();
    
    myCanvas = document.getElementById("main_canvas")
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
    var touchHandler = function (e) {
	myNote.play();
    }

    myCanvas.addEventListener("touchstart", touchHandler, false)
    myCanvas.addEventListener("click", touchHandler, false)

})
