class particle extends entity{
    constructor(layer,x,y,type,direction,size,speed,color){
        super(layer,x,y,type,1)
        this.direction=direction
        this.size=size
        this.speed=speed
        this.color=color
        switch(this.type){
            case 0: case 1:
                this.scale=0
                this.fade=1
            break
        }
    }
    display(){
        if(this.fade>0&&this.size>0&&this.scale>0){
            this.layer.translate(this.position.x,this.position.y)
            this.layer.rotate(this.direction)
            this.layer.scale(this.size*this.scale/10)
            this.layer.noStroke()
            switch(this.type){
                case 0:
                    this.layer.fill(this.color[0][0],this.color[0][1],this.color[0][2],this.fade)
                    this.layer.ellipse(0,0,10,10)
                break
                case 1:
                    this.layer.fill(this.color[0][0],this.color[0][1],this.color[0][2],this.fade)
                    this.layer.ellipse(0,0,10,10)
                    this.layer.fill(this.color[1][0],this.color[1][1],this.color[1][2],this.fade)
                    this.layer.ellipse(0,0,5,5)
                break
            }
            this.layer.scale(10/this.size/this.scale)
            this.layer.rotate(-this.direction)
            this.layer.translate(-this.position.x,-this.position.y)
        }
    }
    update(){
        switch(this.type){
            case 0: case 1:
                this.fade-=this.speed/60
                this.scale+=this.speed/60
                if(this.fade<=0){
                    this.remove=true
                }
            break
        }
    }
}