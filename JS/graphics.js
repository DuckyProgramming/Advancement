function setupGraphics(){
	angleMode(DEGREES)
	textAlign(CENTER,CENTER)
	rectMode(CENTER)
	colorMode(RGB,255,255,255,1)
	graphics.main=createGraphics(900,600)
	setupLayer(graphics.main)
	graphics.backgrounds=[]
	for(let a=0;a<10;a++){
		graphics.backgrounds.push(createGraphics(1800,1200))
		setupLayer(graphics.backgrounds[a])
	}
	graphics.minor=[]
	for(let a=0,la=graphics.minor.length;a<la;a++){
		setupLayer(graphics.minor[a])
	}
}