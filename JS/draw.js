function draw(){
	clear()
	background(125)
	graphics.main.clear()
	switch(stage.scene){
		case 'level':
			switch(game.background){
				case 0:
					graphics.main.background(120)
				break
				case 1:
					graphics.main.background(200,190,180)
				break
			}
			graphics.main.push()
			graphics.main.translate(graphics.main.width/2,graphics.main.height/2)
			graphics.main.scale(stage.focus.scale)
			graphics.main.translate(-stage.focus.x,-stage.focus.y)
			for(let a=0,la=run.fore.length;a<la;a++){
				for(let b=0,lb=run.fore[a].length;b<lb;b++){
					run.fore[a][b].update()
					run.fore[a][b].display()
					if(run.fore[a][b].remove){
						run.fore[a].splice(b,1)
						b--
						lb--
					}
				}
			}
			for(let a=0,la=run.info.length;a<la;a++){
				for(let b=0,lb=run.info[a].length;b<lb;b++){
					run.info[a][b].displayInfo()
				}
			}
			displayBorder(graphics.main,game.edge)
			graphics.main.pop()
			progression(game.mission)
		break
	}
	displayDialogue(graphics.main,dialogue)
	displayTransition(graphics.main,transition)
	stage.scale=min(width/graphics.main.width,height/graphics.main.height)
	image(graphics.main,width/2-stage.scale*graphics.main.width/2,height/2-stage.scale*graphics.main.height/2,stage.scale*graphics.main.width,stage.scale*graphics.main.height)
	updateMouse(graphics.main)
}