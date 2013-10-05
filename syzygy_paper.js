var layer = project.activeLayer

// ASTEROID CONSTRUCTOR
function Asteroid (A) {
    A = A || {}
    this.orbit = new Path.Ellipse({
	center: A.orbitCenter,
	size: [A.orbitRadius, A.orbitRadius],
	strokeColor: 'black'
    })
    this.speed = A.speed || 1 // revolutions per second
    this.radius = 10

    this.t = 0 // will range from 0 to 1 based on how long along its revolution it is
    this.loc = this.orbit.getPointAt(this.t)
    this.shape = new Path.Circle({
	center: this.loc,
	radius: this.radius,
	fillColor: 'blue'
    })

    // move
    // Increase the t value and relocate based on it
    this.move = function (delta) {
	this.t += delta*(this.speed*this.orbit.length)/this.orbit.length
	while (this.t > 1) this.t -= 1
	this.relocate()
    }

    // relocate
    // Places the asteroid in the correct place in its orbit, according to its t value
    this.relocate = function () {
	this.loc = this.orbit.getPointAt(this.t*this.orbit.length)
	this.shape.position = this.loc
    }
}

var ast = new Asteroid ({
    orbitCenter: view.center,
    orbitRadius: 100,
    speed: 1
})

var ast2 = new Asteroid ({
    orbitCenter: view.center,
    orbitRadius: 150,
    speed: 1
})


function onFrame (e) {
    ast.move(e.delta)
    ast2.move(e.delta)
}

function onResize (e) {
    layer.position = view.center
}
