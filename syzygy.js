// PLANET CONTSTRUCTOR
function Planet (P) {
    
}

// ASTEROID CONSTRUCTOR
function Asteroid (A) {
    A = A || {}
    this.radius = A.radius
    this.orbit = A.orbit || {x:0, y:0, r:0, t:0}
}

$(document).ready(function () {
    
    var myCanvas = document.getElementById("main_canvas")
    var myCtx = myCanvas.getContext('2d')    
    
    drawPlanet(myCtx, 40, 40, 30)
    initializeAudio()
    //simpleTone()

    var touchHandler = function (e) {
	if(!thePlaying)
	    simpleToneStart(200, 3, 5)
	else
	    simpleToneStop();
    }

    myCanvas.addEventListener("touchstart", touchHandler, false)
    myCanvas.addEventListener("click", touchHandler, false)

})
