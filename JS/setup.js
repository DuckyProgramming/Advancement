function setup(){
	createCanvas(windowWidth-50,windowHeight-50)
	setupGraphics()

	game.level=missions[game.mission].level
	game.zone=missions[game.mission].zone
	generateWorld(graphics.main,levels[game.level][game.zone])
}
function windowResized(){
	resizeCanvas(windowWidth-50,windowHeight-50)
}