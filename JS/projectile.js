class projectile extends entity{
    constructor(layer,x,y,type,direction,team){
        super(layer,x,y,type,0)
        this.direction=direction
        this.team=team
        this.scale=0
        this.damage=types.projectile[this.type].damage
        this.speed=types.projectile[this.type].speed
        this.size=types.projectile[this.type].size
        this.image=types.projectile[this.type].image
        this.color=types.team[this.team].color
        this.collide={list:[entities.troops]}
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
        this.position.x+=sin(this.direction)*this.speed
        this.position.y-=cos(this.direction)*this.speed
        if(this.scale<1){
            this.scale=round(this.scale*5+1)/5
        }
        if(!this.used){
            for(let a=0,la=this.collide.list.length;a<la;a++){
                for(let b=0,lb=this.collide.list[a].length;b<lb;b++){
                    if(dist(this.position.x,this.position.y,this.collide.list[a][b].position.x,this.collide.list[a][b].position.y)<this.size+this.collide.list[a][b].size&&this.collide.list[a][b].life>0&&this.team!=this.collide.list[a][b].team&&!this.used){
                        this.particle(0)
                        this.used=true
                        this.collide.list[a][b].take(this.damage,this.direction)
                    }
                }
            }
        }
    }
    particle(context){
        switch(context){
            case 0:
                entities.particles.push(new particle(this.layer,this.position.x,this.position.y,0,0,sqrt(this.damage)*10,5,this.color))
            break
        }
    }
}