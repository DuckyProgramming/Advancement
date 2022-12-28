function keyPressed(){
	switch(key){
		case 'a':
			inputs.keys[0][0]=true
		break
		case 'd':
			inputs.keys[0][1]=true
		break
		case 'w':
			inputs.keys[0][2]=true
		break
		case 's':
			inputs.keys[0][3]=true
		break
		case 'ArrowLeft':
			inputs.keys[1][0]=true
		break
		case 'ArrowRight':
			inputs.keys[1][1]=true
		break
		case 'ArrowUp':
			inputs.keys[1][2]=true
		break
		case 'ArrowDown':
			inputs.keys[1][3]=true
		break
		case ' ':
			inputs.keys[2][0]=true
		break
		case 'p':
			if(dev.mark){
				print(inputs.screen.x,inputs.screen.y)
			}
		break
		case 'o':
			if(dev.mark){
				print(inputs.rel.x,inputs.rel.y)
			}
		break
		case 'i':
			if(dev.mark){
				print(round((inputs.rel.x-game.tileSize/2)/game.tileSize)*game.tileSize+game.tileSize/2,round((inputs.rel.y-game.tileSize/2)/game.tileSize)*game.tileSize+game.tileSize/2)
			}
		break
	}
}
function keyReleased(){
	switch(key){
		case 'a':
			inputs.keys[0][0]=false
		break
		case 'd':
			inputs.keys[0][1]=false
		break
		case 'w':
			inputs.keys[0][2]=false
		break
		case 's':
			inputs.keys[0][3]=false
		break
		case 'ArrowLeft':
			inputs.keys[1][0]=false
		break
		case 'ArrowRight':
			inputs.keys[1][1]=false
		break
		case 'ArrowUp':
			inputs.keys[1][2]=false
		break
		case 'ArrowDown':
			inputs.keys[1][3]=false
		break
		case ' ':
			inputs.keys[2][0]=false
		break
	}
}