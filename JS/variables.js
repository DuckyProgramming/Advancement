types={
    projectile:[
        {
            name:'Beam',
            damage:25,speed:15,size:4,time:120,
            trigger:{hit:true,destruct:false,physics:{resistance:false}},
            splash:{damage:0,range:0,class:0},
            image:1,particle:1,
        },{
            name:'Light Beam',
            damage:15,speed:12,size:3,time:120,
            trigger:{hit:true,destruct:false,physics:{resistance:false}},
            splash:{damage:0,range:0,class:0},
            image:1,particle:1,
        },{
            name:'Pellet Beam',
            damage:5,speed:18,size:2,time:120,
            trigger:{hit:true,destruct:false,physics:{resistance:false}},
            splash:{damage:0,range:0,class:0},
            image:2,particle:1,
        },{
            name:'Grenade',
            damage:100,speed:10,size:5,time:90,
            trigger:{hit:false,destruct:true,physics:{resistance:true}},
            splash:{damage:1,range:150,class:0},
            image:3,particle:1,
        },{
            name:'Punch',
            damage:10,speed:0,size:10,time:15,
            trigger:{hit:true,destruct:false,physics:{resistance:false}},
            splash:{damage:0,range:0,class:0},
            image:0,particle:0,
        },{
            name:'Bat',
            damage:30,speed:0,size:20,time:15,
            trigger:{hit:true,destruct:false,physics:{resistance:false}},
            splash:{damage:0,range:0,class:0},
            image:0,particle:0,
        },{
            name:'Rock',
            damage:10,speed:5,size:3,time:90,
            trigger:{hit:true,destruct:false,physics:{resistance:false}},
            splash:{damage:0,range:0,class:0},
            image:4,particle:0,
        },{
            name:'Baseball',
            damage:30,speed:9,size:4,time:120,
            trigger:{hit:true,destruct:false,physics:{resistance:false}},
            splash:{damage:0,range:0,class:0},
            image:5,particle:0,
        },
    ],troop:[
        {
            name:'None',
            life:100,heal:240,speed:2,size:15,turnSpeed:10,
            timer:{life:300},
        },{
            name:'Basic',
            life:120,heal:180,speed:1.5,size:15,turnSpeed:6, 
            timer:{life:240},
        },{
            name:'Standard',
            life:160,heal:210,speed:1.25,size:15,turnSpeed:5,
            timer:{life:270},
        },{
            name:'Heavy',
            life:240,heal:300,speed:1,size:15,turnSpeed:4,
            timer:{life:360},
        },{
            name:'Gang',
            life:100,heal:270,speed:2.25,size:15,turnSpeed:10,
            timer:{life:240},
        },
    ],primary:[
        {
            name:'Unarmed',
            reload:[0],projectile:0,spread:0,spawn:{x:0,y:0},range:[0,0],speed:1,
            recoil:{loop:0,anim:0,speed:0,return:0},
        },{
            name:'Pistol',
            reload:[30],projectile:0,spread:3,spawn:{x:12,y:-15},range:[400,250],speed:0.9,
            recoil:{loop:1,anim:3,speed:1,return:0.2},
        },{
            name:'Assault',
            reload:[10,10,60],projectile:1,spread:5,spawn:{x:12,y:-15},range:[500,300],speed:0.7,
            recoil:{loop:3,anim:4,speed:1,return:0.5},
        },{
            name:'Machine Gun',
            reload:[5,5],projectile:2,spread:10,spawn:{x:12,y:-15},range:[350,200],speed:0.5,
            recoil:{loop:2,anim:2,speed:1,return:0.25},
        },{
            name:'Fists',
            reload:[30],projectile:4,spread:0,spawn:{x:12,y:-15},range:[20,15],speed:0.95,
            recoil:{loop:1,anim:10,speed:0.5,return:0.5},
        },{
            name:'Baseball Bat',
            reload:[30],projectile:5,spread:0,spawn:{x:12,y:-45},range:[0,0],speed:1,
            recoil:{loop:1,anim:10,speed:0.5,return:0.5},
        },
    ],secondary:[
        {
            name:'Unarmed',
            reload:[0],projectile:0,spread:0,spawn:{x:0,y:0},range:[0,0],speed:1,
            recoil:{loop:0,anim:0,speed:0,return:0},
        },{
            name:'Grenade',
            reload:[240],projectile:3,spread:10,spawn:{x:-12,y:-6},range:[200,150],speed:0.95,
            recoil:{loop:1,anim:6,speed:2,return:0.1},
        },{
            name:'Rock Throw',
            reload:[120],projectile:6,spread:5,spawn:{x:-12,y:-6},range:[300,150],speed:0.9,
            recoil:{loop:1,anim:10,speed:0.5,return:0.5},
        },{
            name:'Baseball Throw',
            reload:[120],projectile:7,spread:3,spawn:{x:-12,y:-6},range:[400,250],speed:0.85,
            recoil:{loop:1,anim:10,speed:0.5,return:0.5},
        },
    ],passive:[
        {
            name:'Unarmed',
            speed:1,
        },{
            name:'Quick Shield',
            speed:0.95,
        },
    ],body:[
        {
            name:'Human',
            color:[230,210,140],
        },{
            name:'Duck',
            color:[255,235,35],
        },
    ],team:[
        {
            color:[[50,255,50],[100,255,100]],
            life:1,speed:1,
        },{
            color:[[50,50,255],[100,100,255]],
            life:1,speed:1,
        },{
            color:[[255,50,50],[255,100,100]],
            life:1,speed:1,
        },{
            color:[[255,255,50],[255,255,100]],
            life:1,speed:1,
        },
    ]
}
dev={mark:true}
stage={scale:0,focus:{x:0,y:0,scale:1},scene:'level'}
game={level:0,zone:0,mission:2,progress:0,edge:{x:0,y:0},player:{team:0,alive:false},tileSize:80,timer:0,background:0,end:false}
physics={resistance:0.05,friction:0.025}
graphics={main:0,backgrounds:[],minor:[]}
transition={trigger:false,anim:0,scene:stage.scene,mission:game.mission}
inputs={press:false,mouse:{x:0,y:0},screen:{x:0,y:0},rel:{x:0,y:0},keys:[[false,false,false,false],[false,false,false,false],[false]]}
entities={projectiles:[],walls:[],troops:[],particles:[]}
collision={incident:{x:0,y:0},calculate:{x:0,y:0}}
dialogue={stack:[],talking:[],timer:0,fade:0}
calc={int:[0,0]}
run={fore:[],info:[]}
a=0;b=0;c=0;d=0;_=0
la=0;lb=0;lc=0;ld=0