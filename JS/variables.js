types={
    projectile:[
        {
            name:'Beam',
            damage:5,speed:6,size:6,
            image:1,
        },
    ],troop:[
        {
            name:'Unarmed',
            life:100,speed:3,size:15,
            reload:0,
            set:{loop:0},
        },
    ],
}
stage={scale:0,focus:{x:0,y:0,scale:0},scene:'level',background:0}
game={level:0,zone:0,mission:0,edge:{x:0,y:0},tileSize:40}
physics={resistance:0.05,friction:0.025}
graphics={main:0,backgrounds:[],minor:[]}
transition={trigger:false,anim:0,scene:stage.scene}
inputs={mouse:{x:0,y:0},rel:{x:0,y:0},keys:[[false,false,false,false],[false,false,false,false]]}
entities={walls:[],troops:[]}
collision={incident:{x:0,y:0},calculate:{x:0,y:0}}
run={fore:[],info:[]}
a=0;b=0;c=0;d=0;_=0
la=0;lb=0;lc=0;ld=0