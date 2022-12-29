class projectile extends entity{
    constructor(layer,x,y,type,direction,team,color){
        super(layer,x,y,type,0)
        this.direction=direction
        this.team=team
        this.color=color
        this.scale=0
        this.damage=types.projectile[this.type].damage
        this.speed=types.projectile[this.type].speed
        this.size=types.projectile[this.type].size
        this.time=types.projectile[this.type].time
        this.image=types.projectile[this.type].image
        this.trigger=types.projectile[this.type].trigger
        this.splash=types.projectile[this.type].splash
        this.collide={list:[entities.troops]}
        this.boost={particle:1}
        this.end={time:this.time,value:1}
    }
    display(){
        if(this.fade>0&&this.size>0&&this.scale>0){
            this.layer.translate(this.position.x,this.position.y)
            this.layer.rotate(this.direction)
            this.layer.scale(this.size*this.scale/10)
            this.layer.noStroke()
            switch(this.image){
                case 1:
                    this.layer.stroke(this.color[0][0],this.color[0][1],this.color[0][2],this.fade)
                    this.layer.strokeWeight(6)
                    this.layer.line(0,-40,0,40)
                    this.layer.stroke(this.color[1][0],this.color[1][1],this.color[1][2],this.fade)
                    this.layer.strokeWeight(4)
                    this.layer.line(0,-30,0,30)
                break
                case 2:
                    this.layer.fill(this.color[0][0],this.color[0][1],this.color[0][2],this.fade)
                    this.layer.ellipse(0,0,30,30)
                    this.layer.fill(this.color[1][0],this.color[1][1],this.color[1][2],this.fade)
                    this.layer.ellipse(0,0,20,20)
                break
                case 3:
                    this.layer.fill(120,this.fade)
                    this.layer.stroke(100,this.fade)
                    this.layer.strokeWeight(6)
                    this.layer.ellipse(0,0,20,20)
                    this.layer.noStroke()
                    this.layer.fill(this.color[0][0],this.color[0][1],this.color[0][2],this.fade)
                    this.layer.ellipse(0,0,8,8)
                break
            }
            this.layer.scale(10/this.size/this.scale)
            this.layer.rotate(-this.direction)
            this.layer.translate(-this.position.x,-this.position.y)
        }
    }
    update(){
        super.update()
        if(this.used){
            this.status=1
            this.speed=0
            if(this.fade<=0){
                this.remove=true
            }
        }
        if(this.end.time>0){
            this.end.time-=this.end.value
        }else if(!this.used){
            this.used=true
            if(this.trigger.destruct){
                this.impact(1)
            }
        }
        if(this.trigger.physics.resistance){
            this.speed*=(1-physics.resistance)
        }
        this.position.x+=sin(this.direction)*this.speed
        this.position.y-=cos(this.direction)*this.speed
        if(this.scale<1){
            this.scale=round(this.scale*5+1)/5
        }
        if(!this.used&&this.trigger.hit){
            for(let a=0,la=this.collide.list.length;a<la;a++){
                for(let b=0,lb=this.collide.list[a].length;b<lb;b++){
                    if(dist(this.position.x,this.position.y,this.collide.list[a][b].position.x,this.collide.list[a][b].position.y)<this.size+this.collide.list[a][b].size&&this.collide.list[a][b].life>0&&this.team!=this.collide.list[a][b].team&&!this.used){
                        this.impact(0)
                        this.used=true
                        this.collide.list[a][b].take(this.damage,this.direction)
                    }
                }
            }
        }
    }
    impact(context){
        if(this.splash.damage>0){
            this.boost.particle=this.splash.range/sqrt(this.damage)/8
            for(let a=0,la=this.collide.list.length;a<la;a++){
                for(let b=0,lb=this.collide.list[a].length;b<lb;b++){
                    if(dist(this.position.x,this.position.y,this.collide.list[a][b].position.x,this.collide.list[a][b].position.y)<this.splash.range&&this.collide.list[a][b].life>0){
                        switch(this.splash.class){
                            case 0:
                                this.collide.list[a][b].take(this.splash.damage*this.damage*(1-(dist(this.position.x,this.position.y,this.collide.list[a][b].position.x,this.collide.list[a][b].position.y)/this.splash.range)),this.direction)
                            break
                        }
                    }
                }
            }
        }
        this.particle(context)
    }
    particle(context){
        switch(context){
            case 0:
                entities.particles.push(new particle(this.layer,this.position.x,this.position.y,0,0,sqrt(this.damage)*10*this.boost.particle,5,this.color))
            break
            case 1:
                if(this.splash.damage>0){
                    entities.particles.push(new particle(this.layer,this.position.x,this.position.y,0,0,sqrt(this.damage)*10*this.boost.particle,5,this.color))
                }
            break
        }
    }
}