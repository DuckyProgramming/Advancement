class projectile extends entity{
    constructor(layer,x,y,type,direction,team){
        super(layer,x,y,type,0)
        this.direction=direction
        this.team=team
        this.scale=1
        this.damage=types.projectile[this.type].damage
        this.speed=types.projectile[this.type].speed
        this.size=types.projectile[this.type].size
        this.image=types.projectile[this.type].image
    }
    display(){
        if(this.fade>0&&this.size>0&&this.scale>0){
            this.layer.translate(this.position.x,this.position.y)
            this.layer.rotate(this.direction)
            this.layer.scale(this.size*this.scale)
            switch(this.image){
                case 1:
                    
                break
            }
            this.layer.scale(1/this.size/this.scale)
            this.layer.rotate(-this.direction)
            this.layer.translate(-this.position.x,-this.position.y)
        }
    }
    update(){
        this.position.x+=sin(this.direction)*this.speed
        this.position.y+=cos(this.direction)*this.speed
        if(this.scale<1){
            this.scale=round(this.scale*5+1)/5
        }
    }
}