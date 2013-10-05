function drawPlanet (aCtx, aX, aY, aR) {
    aCtx.beginPath()
    aCtx.arc(aX, aY, aR, 0, 2*Math.PI)
    aCtx.stroke()
}
