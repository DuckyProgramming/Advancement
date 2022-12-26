class troop extends physical{
    constructor(layer,x,y,type,body,direction,team,control){
        super(layer,x,y,0,30,90)
        this.type=type
        this.body=body
        this.direction=direction
        this.team=team
        this.control=control
        this.offset={position:{x:0,y:0}}
        this.trigger={physics:{resistance:true,friction:true}}
        this.recoil={timer:[],value:[]}
		this.timers=[]
        this.scale=1

        this.life=types.troop[this.type].life
        this.speed=types.troop[this.type].speed
        this.turnSpeed=types.troop[this.type].turnSpeed
        this.size=types.troop[this.type].size

        this.base={life:this.life}
        this.collect={life:this.life}
        this.goal={direction:this.direction}
    }
    display(){
        if(this.fade>0&&this.size>0&&this.scale>0){
            this.layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
            this.layer.rotate(this.direction)
            this.layer.scale(this.scale)
            this.layer.noStroke()
            switch(this.type){
                case 0:
                    this.layer.fill(60,this.fade)
                    this.layer.rect(8,-22+this.recoil.value[0],6,12)
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
		this.layer.rect(0,this.size+20,52,10,4)
		this.layer.fill(150,this.fade)
		this.layer.rect(0,this.size+20,50,8,3)
		if(this.collect.life>=this.life){
			this.layer.fill(240,0,0,this.fade)
			this.layer.rect((max(0,this.collect.life)/this.base.life)*25-25,this.size+20,(max(0,this.collect.life)/this.base.life)*50,2+min((max(0,this.collect.life)/this.base.life)*90,6),3)
			this.layer.fill(min(255,510-max(0,this.life)/this.base.life*510)-max(0,5-max(0,this.life)/this.base.life*30)*25,max(0,this.life)/this.base.life*510,0,this.fade)
			this.layer.rect((max(0,this.life)/this.base.life)*25-25,this.size+20,(max(0,this.life)/this.base.life)*50,2+min((max(0,this.life)/this.base.life)*90,6),3)
		}else if(this.collect.life<this.life){
			this.layer.fill(240,0,0,this.fade)
			this.layer.rect((max(0,this.life)/this.base.life)*25-25,this.size+20,(max(0,this.life)/this.base.life)*50,2+min((max(0,this.life)/this.base.life)*90,6),3)
			this.layer.fill(min(255,510-max(0,this.collect.life)/this.base.life*510)-max(0,5-max(0,this.collect.life)/this.base.life*30)*25,max(0,this.collect.life)/this.base.life*510,0,this.fade)
			this.layer.rect((max(0,this.collect.life)/this.base.life)*25-25,this.size+20,(max(0,this.collect.life)/this.base.life)*50,2+min((max(0,this.collect.life)/this.base.life)*90,6),3)
		}
		this.layer.fill(0,this.fade)
		this.layer.textSize(8)
		this.layer.text(max(0,ceil(this.life*10)/10)+"/"+max(0,ceil(this.base.life)),0,this.size+21)
        this.layer.translate(-this.position.x,-this.position.y)
    }
    update(){
        super.update()
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
        if(directionValue(this.direction,this.goal.direction,this.speed)==0){
            this.direction=this.goal.direction
        }else if(directionValue(this.direction,this.goal.direction,this.speed)==1){
            this.direction+=this.speed
        }else if(directionValue(this.direction,this.goal.direction,this.speed)==2){
            this.direction-=this.speed
        }
        switch(this.control){
            case 0:
                this.goal.direction=atan2(inputs.rel.x-this.layer.width/2,this.layer.height/2-inputs.rel.y)
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
            break
        }
    }
}