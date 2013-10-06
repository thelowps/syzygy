/*
 * Syzygy
 * An interactive, fun music synthesizer.
 *
 * David Lopes, Nathan Wickham
 *
 */

// This object maps orbit distances to frequencies.
// It follows the pentatonic scale, for now
var RADII_NOTES = {
    100: 130.81,
    200: 146.83,
    300: 164.81,
    400: 196.00,
    500: 220.00,
    600: 261.63,
    700: 523.25,
    800: 587.33,
    900: 659.26,
    1000: 783.99,
    1100: 880.00,
    1200: 1046.5
}

// An array to keep track of all our asteroids
var ALL_ASTEROIDS = []

// The timekeeper aggregates all information relevant to 
// the timing of orbits and pulses. All time dependent
// operations should be based off its time property
var timeKeeper = {
    time: 0, // runs between 0 and 1
    speed: 0.20, // beats per second
    minSubdivision: 16,
    minUnit: 1/16,
    
    // tick
    // Increment the time by the given delta
    tick: function (delta) {
	this.time += delta*this.speed
	while (this.time > 1) this.time -= 1
    },
    
    // snapTime
    // Returns the closest minimum subdivision to the time given.
    snapTime: function (t) {
	var off = t-this.time
	if (off < 0) off += 1
	return (Math.round(off/this.minUnit) * this.minUnit)
    }
}

// ASTEROID CONSTRUCTOR
// Use with the 'new' operator.
function Asteroid (A) {
    A = A || {}

    // SET UP ORBIT
    var hundred = Math.round(A.orbitRadius/100)
    if (hundred > 12) hundred = 12
    if (hundred < 1) hundred = 1
    var orbitRadius = hundred*100
    this.orbit = new Path.Ellipse({
	center: A.orbitCenter,
	size: [orbitRadius, orbitRadius],
	strokeColor: 'black'
    })
    this.speed = A.speed || 1 // revolutions per second
    
    // SET UP LOCATION AND MOTION VARIABLES
    this.loc = this.orbit.getNearestPoint(A.loc)
    var curveLoc = this.orbit.getNearestLocation(this.loc)
    this.initialT = (curveLoc.parameter + curveLoc.index)/curveLoc.path.curves.length
    this.initialT = timeKeeper.snapTime(this.initialT)
    this.t = 0 // will range from 0 to 1 based on how long along its revolution it is
    this.prevT = 0
    
    // DRAWING
    this.radius = 10
    this.shape = new Path.Circle({
	center: this.loc,
	radius: this.radius,
	fillColor: 'blue'
    })
    this.hue = this.shape.fillColor.hue
    
    // NOTE
    this.frequency = RADII_NOTES[orbitRadius]
    this.note = new Note (this.frequency)
    this.note.start()
   
    // tick
    // The asteroid checks the timekeeper and recalculates its position.
    // It also checks if it should play a note and change color
    this.tick = function () {
	// Calculate the new T, relocate
	this.prevT = this.t
	this.t = timeKeeper.time + this.initialT
	while(this.t >= 1.0) this.t -= 1
	this.loc = this.orbit.getPointAt(this.t*this.orbit.length)
	
	// Reposition the drawing
	this.shape.position = this.loc
	
	// Bring the color back to blue if its not there currently
	if (this.shape.fillColor.hue !== this.hue) {
	    var dist = this.shape.fillColor.hue - this.hue
	    this.shape.fillColor.hue -= dist/5
	}
	
	// Play the note if triggered
	if (this.prevT < 0.5 && this.t >= 0.5) {
	    this.note.play()
	    this.shape.fillColor = 'red'
	}
	
    }
} // close asteroid constructor



////////////////// FRAME HANDLER ///
function onFrame (e) {
    timeKeeper.tick(e.delta)
    for (var i = 0; i < ALL_ASTEROIDS.length; ++i) {
	var ast = ALL_ASTEROIDS[i]
	ast.tick()
    }
}



////////////////// EVENT HANDLERS ///

function onMouseUp (e) {
    var radius = (e.point-view.center).length*2
    var speed = (e.lastPoint-e.point).length
    
    var ast = new Asteroid({
	orbitCenter: view.center,
	orbitRadius: radius,
	speed: 1,
	loc: e.point
    })
    
    
    ALL_ASTEROIDS.push( ast )
}

function onKeyDown (e) {
    if (e.key == 'w') {
	timeKeeper.speed+=0.1
    } else if (e.key == 's') {
	timeKeeper.speed-=0.1
	if(timeKeeper.speed < 0)
	    timeKeeper.speed = 0;
    }
}

