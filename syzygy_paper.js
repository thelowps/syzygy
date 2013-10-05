var layer = project.activeLayer

var RADII_NOTES = {
    100: 130.81,
    200: 146.83,
    300: 164.81,
    400: 196.00,
    500: 220.00,
    600: 261.63
}

var timeKeeper = {
    time: 0,
    offset: 0,
    speed: 0.10,
    minSubdivision: 32,
    minUnit: 1/32,
    
    tick: function (delta) {
	this.time += delta*this.speed
	this.offset = this.time - Math.floor(this.time/this.minUnit)*this.minUnit
	while (this.time > 1) this.time -= 1
    },
    
    snapTime: function (t) {
	console.log("You clicked along " + t + " of the circle")
	var off = t-this.time
	if (off < 0) off += 1
	off = Math.round(off/this.minUnit)
	off = off*this.minUnit
	return off
    }
}

function radiusToFrequency (rad) {
    var hundred = Math.round(rad/100)
    if (hundred > 6) hundred = 6
    if (hundred < 1) hundred = 1
    r = hundred*100
    return RADII_NOTES
}

// ASTEROID CONSTRUCTOR
function Asteroid (A) {
    A = A || {}

    var hundred = Math.round(A.orbitRadius/100)
    if (hundred > 6) hundred = 6
    if (hundred < 1) hundred = 1
    var orbitRadius = hundred*100
    this.orbit = new Path.Ellipse({
	center: A.orbitCenter,
	size: [orbitRadius, orbitRadius],
	strokeColor: 'black'
    })
    this.speed = A.speed || 1 // revolutions per second
    this.radius = 10
    
    this.loc = this.orbit.getNearestPoint(A.loc)
    var curveLoc = this.orbit.getNearestLocation(this.loc)
    this.initialT = (curveLoc.parameter + curveLoc.index)/curveLoc.path.curves.length
    this.initialT = timeKeeper.snapTime(this.initialT)
    this.t = 0 // will range from 0 to 1 based on how long along its revolution it is
    this.prevT = 0
    this.shape = new Path.Circle({
	center: this.loc,
	radius: this.radius,
	fillColor: 'blue'
    })
    
    this.frequency = RADII_NOTES[orbitRadius]
    this.note = new Note (this.frequency)
    this.note.start()

    console.log("radius = " + A.orbitRadius)
    
    // relocate
    // Places the asteroid in the correct place in its orbit, according to its t value
    this.relocate = function () {
	this.prevT = this.t
	this.t = timeKeeper.time + this.initialT
	if (this.prevT < 1 && this.t >= 1) {
	    console.log("PLAYING: " + this.t)
	    this.note.play()
	}
	var myT = this.t
	while(myT >= 1.0) {myT -= 1}
	this.loc = this.orbit.getPointAt(myT*this.orbit.length)
	this.shape.position = this.loc
    }
}


function createAsteroid (e) {
    var radius = (e.point-view.center).length*2
    var speed = (e.lastPoint-e.point).length
    
    ast = new Asteroid({
	orbitCenter: view.center,
	orbitRadius: (e.point - view.center).length*2,
	speed: 1,
	loc: e.point
    })
    
    return ast
}

ALL_ASTEROIDS = []
function onMouseUp (e) {
    ALL_ASTEROIDS.push( createAsteroid(e) )
}

ALL_ASTEROIDS.push( new Asteroid({
    orbitCenter: view.center,
    orbitRadius: 100,
    speed: 1,
    loc: new Point(100,0)
}))

function onFrame (e) {
    timeKeeper.tick(e.delta)
    for (var i = 0; i < ALL_ASTEROIDS.length; ++i) {
	var ast = ALL_ASTEROIDS[i]
	ast.relocate()
    }
}
