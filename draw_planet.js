function drawPlanet (aCtx, aX, aY, aR) {
    aCtx.beginPath()
    aCtx.arc(aX, aY, aR, 0, 2*Math.PI)
    aCtx.strokeStyle = "red"
    aCtx.fillStyle = "red"
    aCtx.fill()
    aCtx.stroke()
}

function drawOrbit (aCtx, aOrbit) {
    aCtx.beginPath()
    aCtx.arc(aOrbit.x, aOrbit.y, aOrbit.r)
    aCtx.stroke
}
