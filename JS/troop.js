
class troop extends physical{
    constructor(layer,x,y,type,primary,secondary,passive,body,direction,team,control,name=''){
        super(layer,x,y,0,30,90)
        this.type=type
        this.primaryKey=primary
        this.secondaryKey=secondary
        this.passiveKey=passive
        this.body=body
        this.direction=direction
        this.team=team
        this.control=control
        this.name=name
        this.offset={position:{x:0,y:0}}
        this.trigger={physics:{resistance:true,friction:true},movement:{active:false}}
        this.calc={damage:0,dist:0}
        this.hold={int:[random(0,100)]}
        this.tick=[0,0,0,0]
		this.timers=[]
        this.scale=1
        this.primary={firing:false,recoil:{timer:[],value:[]},counter:{fire:0}}
        this.secondary={firing:false,recoil:{timer:[],value:[]},counter:{fire:0}}
        
        this.life=types.troop[this.type].life
        this.heal=types.troop[this.type].heal
        this.speed=types.troop[this.type].speed
        this.turnSpeed=types.troop[this.type].turnSpeed
        this.size=types.troop[this.type].size

        this.shield=0
        this.shieldTimer=0

        this.primary.reload=types.primary[this.primaryKey].reload[0]
        this.primary.projectile=types.primary[this.primaryKey].projectile
        this.primary.spread=types.primary[this.primaryKey].spread
        this.primary.spawn=types.primary[this.primaryKey].spawn
        this.primary.range=types.primary[this.primaryKey].range
        this.primary.speed=types.primary[this.primaryKey].speed
        this.primary.recoilSet=types.primary[this.primaryKey].recoil

        this.secondary.reload=types.secondary[this.secondaryKey].reload[0]
        this.secondary.projectile=types.secondary[this.secondaryKey].projectile
        this.secondary.spread=types.secondary[this.secondaryKey].spread
        this.secondary.spawn=types.secondary[this.secondaryKey].spawn
        this.secondary.range=types.secondary[this.secondaryKey].range
        this.secondary.speed=types.secondary[this.secondaryKey].speed
        this.secondary.recoilSet=types.secondary[this.secondaryKey].recoil

        this.color=types.team[this.team].color
        this.life*=types.team[this.team].life
        this.speed*=this.primary.speed*this.secondary.speed*types.team[this.team].speed
        
        this.timer={life:types.troop[this.type].timer.life,shield:0}
        this.base={life:this.life,primary:{reload:types.primary[this.primaryKey].reload},secondary:{reload:types.secondary[this.secondaryKey].reload},timer:{life:this.timer.life,shield:0}}
        this.collect={life:this.life}
        this.goal={position:{x:this.position.x,y:this.position.y},direction:this.direction}

        switch(this.passiveKey){
            case 1:
                this.shield=20
                this.base.shield=this.shield
                this.collect.shield=this.shield
                this.timer.shield=300
                this.base.timer.shield=this.timer.shield
            break
        }

        for(a=0;a<this.primary.recoilSet.loop;a++){
            this.primary.recoil.timer.push(0)
            this.primary.recoil.value.push(0)
        }
        for(a=0;a<this.secondary.recoilSet.loop;a++){
            this.secondary.recoil.timer.push(0)
            this.secondary.recoil.value.push(0)
        }
    }
    display(){
        if(this.fade>0&&this.size>0&&this.scale>0){
            this.layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
            this.layer.rotate(this.direction)
            this.layer.scale(this.scale)
            this.displayBaseLower(this.type)
            this.displaySecondary(this.secondary,this.secondaryKey)
            this.displayPrimary(this.primary,this.primaryKey)
            this.layer.noStroke()
            switch(this.body){
                case 0:
                    this.layer.fill(230,210,140,this.fade)
                    this.layer.ellipse(0,0,40,40)
                    this.layer.fill(0,this.fade)
                    this.layer.ellipse(-8,-9,6,6)
                    this.layer.ellipse(8,-9,6,6)
                break
                case 1:
                    this.layer.fill(255,145,25,this.fade)
                    this.layer.ellipse(0,-18,24,16)
                    this.layer.fill(255,235,35,this.fade)
                    this.layer.ellipse(0,0,40,40)
                    this.layer.fill(0,this.fade)
                    this.layer.ellipse(-8,-9,6,6)
                    this.layer.ellipse(8,-9,6,6)
                    this.layer.stroke(0,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.line(-4,-21,-4,-22)
                    this.layer.line(4,-21,4,-22)
                break
            }
            this.displayBaseUpper(this.type)
            this.layer.scale(1/this.scale)
            this.layer.rotate(-this.direction)
            this.layer.translate(-this.position.x-this.offset.position.x,-this.position.y-this.offset.position.y)
        }
    }
    displayBaseLower(base){
        this.layer.noStroke()
        switch(base){
            case 1:
                this.layer.fill(40,80,40,this.fade)
                this.layer.rect(19,0,4,16,2)
            break
            case 3:
                this.layer.fill(60,this.fade)
                this.layer.ellipse(0,0,44,44)
            break
        }
    }
    displayBaseUpper(base){
        this.layer.noStroke()
        switch(base){
            case 2: case 3:
                this.layer.fill(80,this.fade)
                this.layer.arc(0,0,48,48,0,180)
                this.layer.arc(0,1,48,12,-180,0)
            break
        }
    }
    displayPrimary(weapon,key){
        this.layer.noStroke()
        switch(key){
            case 1:
                this.layer.fill(60,this.fade)
                this.layer.rect(12,-20+weapon.recoil.value[0],4,12)
            break
            case 2:
                this.layer.fill(60,this.fade)
                this.layer.rect(12,-22+weapon.recoil.value[0]+weapon.recoil.value[1]+weapon.recoil.value[2],3,16)
                this.layer.rect(12,-19+weapon.recoil.value[0],6,10)
            break
            case 3:
                this.layer.fill(60,this.fade)
                this.layer.rect(12,-21,8,14)
                this.layer.rect(10,-30+weapon.recoil.value[0],3,8)
                this.layer.rect(14,-30+weapon.recoil.value[1],3,8)
            break
        }
    }
    displaySecondary(weapon,key){
        this.layer.noStroke()
        switch(key){
            case 1:
                this.layer.fill(120,this.fade)
                this.layer.stroke(100,this.fade)
                this.layer.strokeWeight(3)
                this.layer.ellipse(-12,-15+weapon.recoil.value[0],10,10)
                this.layer.noStroke()
                this.layer.fill(this.color[0][0],this.color[0][1],this.color[0][2],this.fade)
                this.layer.ellipse(-12,-15+weapon.recoil.value[0],4,4)
            break
        }
    }
    displayInfo(){
        this.layer.translate(this.position.x,this.position.y)
		this.layer.noStroke()
		this.layer.fill(0,this.fade)
		this.layer.rect(0,this.size+20,52,9,4)
		this.layer.fill(150,this.fade)
		this.layer.rect(0,this.size+20,50,7,3)
		if(this.collect.life>=this.life&&this.collect.life>0){
			this.layer.fill(240,0,0,this.fade)
			this.layer.rect((max(0,this.collect.life)/this.base.life)*25-25,this.size+20,(max(0,this.collect.life)/this.base.life)*50,2+min((max(0,this.collect.life)/this.base.life)*90,5),3)
			this.layer.fill(min(255,510-max(0,this.life)/this.base.life*510)-max(0,5-max(0,this.life)/this.base.life*30)*25,max(0,this.life)/this.base.life*510,0,this.fade)
			this.layer.rect((max(0,this.life)/this.base.life)*25-25,this.size+20,(max(0,this.life)/this.base.life)*50,2+min((max(0,this.life)/this.base.life)*90,5),3)
		}else if(this.collect.life<this.life&&this.life>0){
			this.layer.fill(240,0,0,this.fade)
			this.layer.rect((max(0,this.life)/this.base.life)*25-25,this.size+20,(max(0,this.life)/this.base.life)*50,2+min((max(0,this.life)/this.base.life)*90,5),3)
			this.layer.fill(min(255,510-max(0,this.collect.life)/this.base.life*510)-max(0,5-max(0,this.collect.life)/this.base.life*30)*25,max(0,this.collect.life)/this.base.life*510,0,this.fade)
			this.layer.rect((max(0,this.collect.life)/this.base.life)*25-25,this.size+20,(max(0,this.collect.life)/this.base.life)*50,2+min((max(0,this.collect.life)/this.base.life)*90,5),3)
		}
        if(this.base.shield>0){
            this.layer.fill(0,this.fade)
            this.layer.rect(0,this.size+30,52,9,4)
            this.layer.fill(150,this.fade)
            this.layer.rect(0,this.size+30,50,7,3)
            if(this.collect.shield>=this.shield&&this.collect.shield>0){
                this.layer.fill(150,255,255,this.fade)
                this.layer.rect((max(0,this.collect.shield)/this.base.shield)*25-25,this.size+30,(max(0,this.collect.shield)/this.base.shield)*50,2+min((max(0,this.collect.shield)/this.base.shield)*90,5),3)
                this.layer.fill(0,max(0,this.shield)/this.base.shield*155+100,255,this.fade)
                this.layer.rect((max(0,this.shield)/this.base.shield)*25-25,this.size+30,(max(0,this.shield)/this.base.shield)*50,2+min((max(0,this.shield)/this.base.shield)*90,5),3)
            }else if(this.collect.shield<this.shield&&this.shield>0){
                this.layer.fill(150,255,255,this.fade)
                this.layer.rect((max(0,this.shield)/this.base.shield)*25-25,this.size+30,(max(0,this.shield)/this.base.shield)*50,2+min((max(0,this.shield)/this.base.shield)*90,5),3)
                this.layer.fill(0,max(0,this.collect.shield)/this.base.shield*155+100,255,this.fade)
                this.layer.rect((max(0,this.collect.shield)/this.base.shield)*25-25,this.size+30,(max(0,this.collect.shield)/this.base.shield)*50,2+min((max(0,this.collect.shield)/this.base.shield)*90,5),3)
            }
            this.layer.fill(0,this.fade)
            this.layer.textSize(7)
            this.layer.text(max(0,ceil(this.life))+"/"+max(0,ceil(this.base.life)),0,this.size+21)
            this.layer.text(max(0,ceil(this.shield))+"/"+max(0,ceil(this.base.shield)),0,this.size+31)
            this.layer.text(this.name,0,this.size+39)
        }else{
            this.layer.fill(0,this.fade)
            this.layer.textSize(7)
            this.layer.text(max(0,ceil(this.life))+"/"+max(0,ceil(this.base.life)),0,this.size+21)
            this.layer.text(this.name,0,this.size+29)
        }
        this.layer.translate(-this.position.x,-this.position.y)
    }
    update(){
        super.update()
        if(this.life<=0){
            this.status=1
            if(this.life<=0&&this.team!=game.player.team){
                this.remove=true
            }
        }else{
            this.life=min(this.life,this.base.life)
            this.collect.life=min(this.collect.life,this.base.life)
            this.collect.life=this.collect.life*0.9+this.life*0.1
            this.shield=min(this.shield,this.base.shield)
            this.collect.shield=min(this.collect.shield,this.base.shield)
            this.collect.shield=this.collect.shield*0.9+this.shield*0.1
            if(this.trigger.physics.resistance){
                this.velocity.x*=(1-physics.resistance)
                this.velocity.y*=(1-physics.resistance)
            }
            for(let a=0,la=this.timers.length;a<la;a++){
                if(this.timers[a]>0){
                    this.timers[a]--
                }
            }
            if(this.direction>180){
                this.direction-=360
            }else if(this.direction<-180){
                this.direction+=360
            }
            if(this.goal.direction>180){
                this.goal.direction-=360
            }else if(this.goal.direction<-180){
                this.goal.direction+=360
            }
            if(directionValue(this.direction,this.goal.direction,this.turnSpeed)==0){
                this.direction=this.goal.direction
            }else if(directionValue(this.direction,this.goal.direction,this.turnSpeed)==1){
                this.direction+=this.turnSpeed
            }else if(directionValue(this.direction,this.goal.direction,this.turnSpeed)==2){
                this.direction-=this.turnSpeed
            }
            for(let a=0,la=this.primary.recoil.timer.length;a<la;a++){
                if(this.primary.recoil.timer[a]>0){
                    this.primary.recoil.timer[a]--
                    this.primary.recoil.value[a]+=this.primary.recoilSet.speed
                }else if(this.primary.recoil.value[a]>0){
                    this.primary.recoil.value[a]-=this.primary.recoilSet.return
                }
            }
            for(let a=0,la=this.secondary.recoil.timer.length;a<la;a++){
                if(this.secondary.recoil.timer[a]>0){
                    this.secondary.recoil.timer[a]--
                    this.secondary.recoil.value[a]+=this.secondary.recoilSet.speed
                }else if(this.secondary.recoil.value[a]>0){
                    this.secondary.recoil.value[a]-=this.secondary.recoilSet.return
                }
            }
            if(this.primary.firing&&this.primary.reload<=0&&this.base.primary.reload[0]>0){
                this.primary.reload=this.base.primary.reload[this.primary.counter.fire%this.primary.recoilSet.loop]
                this.primary.recoil.timer[this.primary.counter.fire%this.primary.recoilSet.loop]=this.primary.recoilSet.anim
                this.primary.counter.fire++
                entities.projectiles.push(new projectile(this.layer,this.position.x+cos(this.direction)*this.primary.spawn.x-sin(this.direction)*this.primary.spawn.y,this.position.y+cos(this.direction)*this.primary.spawn.y+sin(this.direction)*this.primary.spawn.x,this.primary.projectile,this.direction+random(-this.primary.spread,this.primary.spread),this.team,this.color))
            }
            if(this.secondary.firing&&this.secondary.reload<=0&&this.base.secondary.reload[0]>0){
                this.secondary.reload=this.base.secondary.reload[this.secondary.counter.fire%this.secondary.recoilSet.loop]
                this.secondary.recoil.timer[this.secondary.counter.fire%this.secondary.recoilSet.loop]=this.secondary.recoilSet.anim
                this.secondary.counter.fire++
                entities.projectiles.push(new projectile(this.layer,this.position.x+cos(this.direction)*this.secondary.spawn.x-sin(this.direction)*this.secondary.spawn.y,this.position.y+cos(this.direction)*this.secondary.spawn.y+sin(this.direction)*this.secondary.spawn.x,this.secondary.projectile,this.direction+random(-this.secondary.spread,this.secondary.spread),this.team,this.color))
            }
            if(this.primary.reload>0){
                this.primary.reload--
            }
            if(this.secondary.reload>0){
                this.secondary.reload--
            }
            if(this.timer.shield>0){
                this.timer.shield--
            }else if(this.shield<=0){
                this.timer.shield=this.base.timer.shield
                this.shield=this.base.shield
            }
            if(this.timer.life>0){
                this.timer.life--
            }else if(this.life<this.base.life){
                this.life+=this.base.life/this.heal
            }
            switch(this.control){
                case 0:
                    this.goal.direction=atan2(inputs.rel.x-this.position.x,this.position.y-inputs.rel.y)
                    if(inputs.keys[0][0]||inputs.keys[1][0]){
                        this.velocity.x-=this.speed/10
                    }
                    if(inputs.keys[0][1]||inputs.keys[1][1]){
                        this.velocity.x+=this.speed/10
                    }
                    if(inputs.keys[0][2]||inputs.keys[1][2]){
                        this.velocity.y-=this.speed/10
                    }
                    if(inputs.keys[0][3]||inputs.keys[1][3]){
                        this.velocity.y+=this.speed/10
                    }
                    stage.focus.x=this.position.x
                    stage.focus.y=this.position.y
                    if(this.life>0){
                        game.player.alive=true
                    }else{
                        game.player.alive=false
                    }
                    this.primary.firing=inputs.press
                    this.secondary.firing=inputs.keys[2][0]
                break
                case 1:
                    this.calc.dist=600
                    for(let a=0,la=entities.troops.length;a<la;a++){
                        if(entities.troops[a].life>0&&this.team!=entities.troops[a].team){
                            this.calc.dist=min(this.calc.dist,dist(this.position.x,this.position.y,entities.troops[a].position.x,entities.troops[a].position.y))
                        }
                    }
                    if(this.calc.dist==600){
                        this.goal.position.x=stage.focus.x
                        this.goal.position.y=stage.focus.y
                    }else{
                        for(let a=0,la=entities.troops.length;a<la;a++){
                            if(dist(this.position.x,this.position.y,entities.troops[a].position.x,entities.troops[a].position.y)==this.calc.dist){
                                this.goal.position.x=entities.troops[a].position.x
                                this.goal.position.y=entities.troops[a].position.y
                            }
                        }
                        if(dist(this.position.x,this.position.y,this.goal.position.x,this.goal.position.y)<this.primary.range[0]){
                            this.primary.firing=true
                        }
                    }
                    this.goal.direction=atan2(this.goal.position.x-this.position.x,this.position.y-this.goal.position.y)
                    for(let a=0,la=this.tick.length;a<la;a++){
                        if(this.tick[a]==0&&floor(random(0,120))==0){
                            this.tick[a]=1
                        }else if(this.tick[a]==1&&floor(random(0,30))==0){
                            this.tick[a]=0
                        }
                    }
                    if(dist(this.position.x,this.position.y,this.goal.position.x,this.goal.position.y)>100+this.hold.int[0]){
                        if(this.position.x>stage.focus.x+10||this.tick[0]==1){
                            this.velocity.x-=this.speed/10
                        }
                        if(this.position.x<stage.focus.x-10||this.tick[1]==1){
                            this.velocity.x+=this.speed/10
                        }
                        if(this.position.y>stage.focus.y+10||this.tick[2]==1){
                            this.velocity.y-=this.speed/10
                        }
                        if(this.position.y<stage.focus.y-10||this.tick[3]==1){
                            this.velocity.y+=this.speed/10
                        }
                    }
                break
                case 2:
                    this.calc.dist=1000000
                    for(let a=0,la=entities.troops.length;a<la;a++){
                        if(entities.troops[a].life>0&&this.team!=entities.troops[a].team){
                            this.calc.dist=min(this.calc.dist,dist(this.position.x,this.position.y,entities.troops[a].position.x,entities.troops[a].position.y))
                        }
                    }
                    for(let a=0,la=entities.troops.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.troops[a].position.x,entities.troops[a].position.y)==this.calc.dist){
                            this.goal.position.x=entities.troops[a].position.x
                            this.goal.position.y=entities.troops[a].position.y
                        }
                    }
                    this.goal.direction=atan2(this.goal.position.x-this.position.x,this.position.y-this.goal.position.y)
                    for(let a=0,la=this.tick.length;a<la;a++){
                        if(this.tick[a]==0&&floor(random(0,120))==0){
                            this.tick[a]=1
                        }else if(this.tick[a]==1&&floor(random(0,30))==0){
                            this.tick[a]=0
                        }
                    }
                    if(dist(this.position.x,this.position.y,this.goal.position.x,this.goal.position.y)<750){
                        this.trigger.movement.active=true
                    }
                    if(this.trigger.movement.active&&dist(this.position.x,this.position.y,this.goal.position.x,this.goal.position.y)<this.primary.range[0]){
                        this.primary.firing=true
                    }
                    if(dist(this.position.x,this.position.y,this.goal.position.x,this.goal.position.y)>this.primary.range[1]+this.hold.int[0]&&this.trigger.movement.active){
                        if(this.position.x>stage.focus.x+10||this.tick[0]==1){
                            this.velocity.x-=this.speed/10
                        }
                        if(this.position.x<stage.focus.x-10||this.tick[1]==1){
                            this.velocity.x+=this.speed/10
                        }
                        if(this.position.y>stage.focus.y+10||this.tick[2]==1){
                            this.velocity.y-=this.speed/10
                        }
                        if(this.position.y<stage.focus.y-10||this.tick[3]==1){
                            this.velocity.y+=this.speed/10
                        }
                    }else if(this.trigger.movement.active){
                        if(this.tick[0]==1){
                            this.velocity.x-=this.speed/10
                        }
                        if(this.tick[1]==1){
                            this.velocity.x+=this.speed/10
                        }
                        if(this.tick[2]==1){
                            this.velocity.y-=this.speed/10
                        }
                        if(this.tick[3]==1){
                            this.velocity.y+=this.speed/10
                        }
                    }
                break
            }
        }
    }
    take(damage,direction,context){
        this.calc.damage=damage
        if(this.shield>=this.calc.damage&&context!=1){
            this.shield-=this.calc.damage
        }else if(this.shield>0&&context!=1){
            this.life-=this.calc.damage-this.shield
            this.shield=0
            this.timer.life=this.base.timer.life
            this.timer.shield=this.base.timer.shield
        }else{
            this.timer.life=this.base.timer.life
            this.life-=this.calc.damage
        }
    }
}