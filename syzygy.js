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
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
    var myCtx = myCanvas.getContext('2d')    
    
    initializeAudio()

    var touchHandler = function (e) {
	alert("Hello!")
	simpleTone()
    }

    myCanvas.addEventListener("touchstart", touchHandler, false)
    myCanvas.addEventListener("click", touchHandler, false)

})
