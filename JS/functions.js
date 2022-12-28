function setupLayer(layer){
	layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
	layer.noStroke()
}
function displayTransition(layer,transition){
	layer.noStroke()
	layer.fill(0)
	layer.rect(transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height)
	layer.rect(layer.width-transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height)
	layer.rect(layer.width/2,transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2)
	layer.rect(layer.width/2,layer.height-transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2)
	if(transition.trigger){
		transition.anim=round(transition.anim*10+1)/10
		if(transition.anim>1.1){
			transition.trigger = false
			stage.scene=transition.scene
		}
	}
	else if(transition.anim>0){
		transition.anim=round(transition.anim*10-1)/10
	}
}
function regTriangle(layer,x,y,radius,direction){
	layer.triangle(x+sin(direction)*radius,y+cos(direction)*radius,x+sin(direction+120)*radius,y+cos(direction+120)*radius,x+sin(direction+240)*radius,y+cos(direction+240)*radius);
}
function regPoly(layer,x,y,sides,radius,direction){
	layer.beginShape()
	for(let a=0;a<sides;a++){
		layer.vertex(x+sin(direction+a*360/sides)*radius,y+cos(direction+a*360/sides)*radius)
	}
	layer.endShape(CLOSE)
}
function sign(value){
	if(value>=0){return 1}
	else{return -1}
}
function toggle(bool){
	if(bool){return false}
	else{return true}
}
function pointInsideBox(point,box){
	if(point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2){
		return true
	}
	else{
		return false
	}
}
function rotatePoint(point,direction,origin){
	return {x:dist(point.x-origin.x,point.y-origin.y,0,0)*sin(atan2(point.x-origin.x,point.y-origin.y)+direction),y:dist(point.x-origin.x,point.y-origin.y,0,0)*cos(atan2(point.x-origin.x,point.y-origin.y)+direction)}
}
function pushPoint(point,origin,size){
	if(dist(point.x,point.y,origin.x,origin.y)>size){
		return {x:point.x,y:point.y}
	}
	else{
		return {x:origin.x+sin(atan2(point.x-origin.x,point.y-origin.y))*size,y:origin.y+cos(atan2(point.x-origin.x,point.y-origin.y))*size}
	}
}
function directionValue(start,target,bound){
	if(abs(target-start)<bound||abs(target-start-360)<bound||abs(target-start+360)<bound||abs(target-start-720)<bound||abs(target-start+720)<bound){
		return 0
	}else if(start>target-180&&start<target||start>target-540&&start<target-360||start>target+180&&start<target+360||start>target-900&&start<target-720||start>target+540&&start<target+720){
		return 1
	}else if(start>target&&start<target+180||start>target-360&&start<target-180||start>target+360&&start<target+540||start>target-720&&start<target-540||start>target+720&&start<target+900){
		return 2
	}
}
function circleInsideBox(box,circle){
	if(dist(circle.position.x,circle.position.y,constrain(circle.position.x,box.position.x-box.width/2,box.position.x+box.width/2),constrain(circle.position.y,box.position.y-box.height/2,box.position.y+box.height/2))<circle.size){
		return true
	}
	else{
		return false
	}
}
function circleCollideBox(box,circle){
	return pushPoint(circle.position,{x:constrain(circle.position.x,box.position.x-box.width/2,box.position.x+box.width/2),y:constrain(circle.position.y,box.position.y-box.height/2,box.position.y+box.height/2)},circle.size+1)
}
function boxInsideBox(box1,box2){
	if(box1.position.x>box2.position.x-box1.width/2-box2.width/2&&box1.position.x<box2.position.x+box1.width/2+box2.width/2&&box1.position.y>box2.position.y-box1.height/2-box2.height/2&&box1.position.y<box2.position.y+box1.height/2+box2.height/2){
		return true
	}
	else{
		return false
	}
}
function boxCollideBox(static,mobile){
	if(mobile.position.x==mobile.previous.position.x||mobile.position.x<static.position.x&&mobile.position.x<mobile.previous.position.x||mobile.position.x>static.position.x&&mobile.position.x>mobile.previous.position.x||mobile.position.x>static.position.x-static.width/2-mobile.width/2&&mobile.previous.position.x>static.position.x-static.width/2-mobile.width/2&&mobile.position.x<static.position.x+static.width/2+mobile.width/2&&mobile.previous.position.x<static.position.x+static.width/2+mobile.width/2){
		collision.incident.x=1
	}
	else if(mobile.position.x<static.position.x){
		collision.incident.x=(static.position.x-static.width/2-mobile.width/2-mobile.previous.position.x)/(mobile.position.x-mobile.previous.position.x)
	}
	else{
		collision.incident.x=(static.position.x+static.width/2+mobile.width/2-mobile.previous.position.x)/(mobile.position.x-mobile.previous.position.x)
	}
	if(mobile.position.y==mobile.previous.position.y||mobile.position.y<static.position.y&&mobile.position.y<mobile.previous.position.y||mobile.position.y>static.position.y&&mobile.position.y>mobile.previous.position.y||mobile.position.y>static.position.y-static.height/2-mobile.height/2&&mobile.previous.position.y>static.position.y-static.height/2-mobile.height/2&&mobile.position.y<static.position.y+static.height/2+mobile.height/2&&mobile.previous.position.y<static.position.y+static.height/2+mobile.height/2){
		collision.incident.y=1
	}
	else if(mobile.position.y<static.position.y){
		collision.incident.y=(static.position.y-static.height/2-mobile.height/2-mobile.previous.position.y)/(mobile.position.y-mobile.previous.position.y)
	}
	else{
		collision.incident.y=(static.position.y+static.height/2+mobile.height/2-mobile.previous.position.y)/(mobile.position.y-mobile.previous.position.y)
	}
	if(collision.incident.x<collision.incident.y){
		if(mobile.position.x<static.position.x){
			collision.calculate.x=static.position.x-static.width/2-mobile.width/2
		}
		else{
			collision.calculate.x=static.position.x+static.width/2+mobile.width/2
		}
		collision.calculate.y=mobile.previous.position.y*(1-collision.incident.y)+mobile.position.y*collision.incident.y
	}
	else{
		if(mobile.position.y<static.position.y){
			collision.calculate.y=static.position.y-static.height/2-mobile.height/2
		}
		else{
			collision.calculate.y=static.position.y+static.height/2+mobile.height/2
		}
		collision.calculate.x=mobile.previous.position.x*(1-collision.incident.x)+mobile.position.x*collision.incident.x
	}
	if(atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)>atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)<atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)){
		return 0
	}
	else if(atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)<atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)||atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)>atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)){
		return 1
	}
	else if(atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)<atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)&&atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)>atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)){
		return 2
	}
	else if(atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)<atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)>atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)){
		return 3
	}
	else{
		return -1
	}
}
function updateMouse(layer){
	inputs.mouse.x=mouseX
	inputs.mouse.y=mouseY
	inputs.screen.x=(inputs.mouse.x-width/2)/stage.scale+layer.width/2
	inputs.screen.y=(inputs.mouse.y-height/2)/stage.scale+layer.height/2
	inputs.rel.x=(inputs.screen.x-layer.width/2)/stage.focus.scale+stage.focus.x
	inputs.rel.y=(inputs.screen.y-layer.height/2)/stage.focus.scale+stage.focus.y
}
function generateWorld(layer,level){
	if(level.length>0&&level[0].length>0){
		game.edge.x=level[0].length*game.tileSize
		game.edge.y=level.length*game.tileSize
		game.player.team=missions[game.mission].player.team
		game.player.alive=false
		for(let a=0,la=level.length;a<la;a++){
			for(let b=0,lb=level[a].length;b<lb;b++){
				if(level[a][b]>=100){
					entities.walls.push(new wall(layer,b*game.tileSize+floor((level[a][b]%100)/10)*game.tileSize/2+game.tileSize/2,a*game.tileSize+(level[a][b]%10)*game.tileSize/2+game.tileSize/2,floor(level[a][b]/100),floor((level[a][b]%100)/10)*game.tileSize+game.tileSize,(level[a][b]%10)*game.tileSize+game.tileSize))
				}else if(level[a][b]==-1){
					entities.troops.push(new troop(layer,b*game.tileSize+game.tileSize/2,a*game.tileSize+game.tileSize/2,missions[game.mission].player.type,missions[game.mission].player.primary,missions[game.mission].player.secondary,missions[game.mission].player.body,missions[game.mission].player.direction,missions[game.mission].player.team,0,missions[game.mission].player.name))
					calc.int[0]=0
					calc.int[1]=0
					for(let c=0,lc=missions[game.mission].ally.length;c<lc;c++){
						for(let d=0,ld=missions[game.mission].ally[c].number;d<ld;d++){
							calc.int[0]++
						}
					}
					for(let c=0,lc=missions[game.mission].ally.length;c<lc;c++){
						for(let d=0,ld=missions[game.mission].ally[c].number;d<ld;d++){
							entities.troops.push(new troop(layer,b*game.tileSize+game.tileSize/2+sin(calc.int[1]/calc.int[0]*360)*sqrt(calc.int[0])*50,a*game.tileSize+game.tileSize/2+cos(calc.int[1]/calc.int[0]*360)*sqrt(calc.int[0])*50,missions[game.mission].ally[c].type,missions[game.mission].ally[c].primary,missions[game.mission].ally[c].secondary,missions[game.mission].ally[c].body,missions[game.mission].ally[c].direction,missions[game.mission].ally[c].team,1,missions[game.mission].ally[c].name[d]))
							calc.int[1]++
						}
					}
				}
			}
		}
		for(let a=0,la=missions[game.mission].other.length;a<la;a++){
			calc.int[0]=0
			calc.int[1]=0
			for(let b=0,lb=missions[game.mission].other[a].group.length;b<lb;b++){
				for(let c=0,lc=missions[game.mission].other[a].group[b].number;c<lc;c++){
					calc.int[0]++
				}
			}
			for(let b=0,lb=missions[game.mission].other[a].group.length;b<lb;b++){
				for(let c=0,lc=missions[game.mission].other[a].group[b].number;c<lc;c++){
					entities.troops.push(new troop(layer,missions[game.mission].other[a].position.x+sin(calc.int[1]/calc.int[0]*360)*sqrt(calc.int[0])*25,missions[game.mission].other[a].position.y+cos(calc.int[1]/calc.int[0]*360)*sqrt(calc.int[0])*25,missions[game.mission].other[a].group[b].type,missions[game.mission].other[a].group[b].primary,missions[game.mission].other[a].group[b].secondary,missions[game.mission].other[a].group[b].body,missions[game.mission].other[a].group[b].direction,missions[game.mission].other[a].group[b].team,2))
					calc.int[1]++
				}
			}
		}
	}
	run={fore:[entities.projectiles,entities.walls,entities.troops,entities.particles],info:[entities.troops]}
}