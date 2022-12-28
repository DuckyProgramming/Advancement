class troop extends physical{
    constructor(layer,x,y,type,body,direction,team,control,name=''){
        super(layer,x,y,0,30,90)
        this.type=type
        this.body=body
        this.direction=direction
        this.team=team
        this.control=control
        this.name=name
        this.offset={position:{x:0,y:0}}
        this.trigger={physics:{resistance:true,friction:true},movement:{active:false}}
        this.recoil={timer:[],value:[]}
        this.counter={fire:0}
        this.calc={damage:0}
        this.hold={int:[random(0,100)]}
        this.tick=[0,0,0,0]
		this.timers=[]
        this.scale=1
        this.firing=false

        this.life=types.troop[this.type].life
        this.speed=types.troop[this.type].speed
        this.turnSpeed=types.troop[this.type].turnSpeed
        this.size=types.troop[this.type].size

        this.reload=types.troop[this.type].reload
        this.projectile=types.troop[this.type].projectile
        this.spread=types.troop[this.type].spread
        this.spawn=types.troop[this.type].spawn

        this.recoilSet=types.troop[this.type].recoil

        this.base={life:this.life,reload:this.reload}
        this.collect={life:this.life}
        this.goal={position:{x:this.position.x,y:this.position.y},direction:this.direction}

        for(a=0;a<this.recoilSet.loop;a++){
            this.recoil.timer.push(0)
            this.recoil.value.push(0)
        }
    }
    display(){
        if(this.fade>0&&this.size>0&&this.scale>0){
            this.layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
            this.layer.rotate(this.direction)
            this.layer.scale(this.scale)
            this.layer.noStroke()
            switch(this.type){
                case 1:
                    this.layer.fill(60,this.fade)
                    this.layer.rect(12,-20+this.recoil.value[0],4,12)
                break
            }
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
            this.layer.scale(1/this.scale)
            this.layer.rotate(-this.direction)
            this.layer.translate(-this.position.x-this.offset.position.x,-this.position.y-this.offset.position.y)
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
		this.layer.fill(0,this.fade)
		this.layer.textSize(7)
		this.layer.text(max(0,ceil(this.life*10)/10)+"/"+max(0,ceil(this.base.life)),0,this.size+21)
        this.layer.text(this.name,0,this.size+29)
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
            for(let a=0,la=this.recoil.timer.length;a<la;a++){
                if(this.recoil.timer[a]>0){
                    this.recoil.timer[a]--
                    this.recoil.value[a]+=this.recoilSet.speed
                }else if(this.recoil.value[a]>0){
                    this.recoil.value[a]-=this.recoilSet.return
                }
            }
            if(this.firing&&this.reload<=0&&this.base.reload>0){
                this.reload=this.base.reload
                this.recoil.timer[this.counter.fire%this.recoilSet.loop]=this.recoilSet.anim
                this.counter.fire++
                entities.projectiles.push(new projectile(this.layer,this.position.x+cos(this.direction)*this.spawn.x-sin(this.direction)*this.spawn.y,this.position.y+cos(this.direction)*this.spawn.y+sin(this.direction)*this.spawn.x,this.projectile,this.direction+random(-this.spread,this.spread),this.team))
            }
            if(this.reload>0){
                this.reload--
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
                    stage.focus.scale=1
                    this.firing=mouseIsPressed
                break
                case 1:
                    this.goal.position.x=stage.focus.x
                    this.goal.position.y=stage.focus.y
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
                    this.goal.position.x=stage.focus.x
                    this.goal.position.y=stage.focus.y
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
                    if(this.trigger.movement.active&&dist(this.position.x,this.position.y,this.goal.position.x,this.goal.position.y)<450){
                        this.firing=true
                    }
                    if(dist(this.position.x,this.position.y,this.goal.position.x,this.goal.position.y)>250+this.hold.int[0]&&this.trigger.movement.active){
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
            }
        }
    }
    take(damage,direction){
        this.calc.damage=damage
        this.life-=this.calc.damage
    }
}