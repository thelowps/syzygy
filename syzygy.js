// PLANET CONTSTRUCTOR
function Planet (P) {
    
}

$(document).ready(function () {
    
    initializeAudio()
    
    myCanvas = document.getElementById("main_canvas")
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
    var touchHandler = function (e) {
	if(!thePlaying)
	    simpleToneStart(200, 3, 5)
	else
	    simpleToneStop();
    }

    myCanvas.addEventListener("touchstart", touchHandler, false)
    myCanvas.addEventListener("click", touchHandler, false)

})
