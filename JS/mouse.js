function mouseClicked(){
	inputs.press=false
	updateMouse(graphics.main)
	if(dialogue.stack.length>0){
		dialogue.timer=0
	}
	switch(stage.scene){
		case 'level':
		break
	}
}
function mousePressed(){
	inputs.press=true
}