class wall extends physical{
	constructor(layer,x,y,type,width,height){
		super(layer,x,y,type,width,height)
		this.collide={position:{x:0,y:0},list:[entities.projectiles,entities.troops]}
		switch(this.type){
			case 3:
				this.width*=0.8
				this.height*=0.6
			break
		}
	}
	display(){
		this.layer.translate(this.position.x,this.position.y)
		this.layer.noStroke()
		switch(this.type){
			case 1:
				this.layer.fill(80,70,60,this.fade)
				this.layer.rect(0,0,this.width+2,this.height+2)
			break
			case 2:
				this.layer.fill(60,this.fade)
				this.layer.rect(0,0,this.width+2,this.height+2)
			break
			case 3:
				this.layer.fill(100,200,200,this.fade)
				this.layer.stroke(100,255,255,this.fade)
				this.layer.strokeWeight(4)
				this.layer.rect(0,0,this.width,this.height,4)
				this.layer.fill(0,this.fade)
				this.layer.noStroke()
				this.layer.textSize(10)
				if(floor(this.position.x/160)==1){
					this.layer.text('Menu',0,0)
				}else if(floor(this.position.x/160)-1<missions.length){
					this.layer.text(missions[floor(this.position.x/160)-1].name,0,0)
				}
			break
		}
		this.layer.translate(-this.position.x,-this.position.y)
	}
	update(){
		super.update()
		for(let a=0,la=this.collide.list.length;a<la;a++){
            for(let b=0,lb=this.collide.list[a].length;b<lb;b++){
                if(circleInsideBox(this,this.collide.list[a][b])&&!(a==0&&this.collide.list[a][b].speed==0)){
                    this.collide.position.x=circleCollideBox(this,this.collide.list[a][b]).x
                    this.collide.position.y=circleCollideBox(this,this.collide.list[a][b]).y
                    this.collide.list[a][b].position.x=this.collide.position.x
                    this.collide.list[a][b].position.y=this.collide.position.y
                    if(a==0){
						this.collide.list[a][b].impact(1)
						this.collide.list[a][b].used=true
					}else if(this.collide.list[a][b].trigger.physics.friction){
                        this.collide.list[a][b].velocity.x*=(1-physics.friction)
                        this.collide.list[a][b].velocity.y*=(1-physics.friction)
                    }
                }
            }
        }
	}
}