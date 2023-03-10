function progression(mission){
    game.end=true
    for(let a=0,la=entities.troops.length;a<la;a++){
        if(entities.troops[a].team!=game.player.team&&entities.troops[a].life>0){
            game.end=false
        }
    }
    switch(mission){
        case 1:
        break
        case 2:
            if(game.progress==0){
                game.progress=1
                dialogue.timer=120
                dialogue.stack=["Come on, Duckipo, they're up ahead.","Let's show them what we're made of."]
                dialogue.talking=['Dippy','Dippy']
            }
            if(game.end&&game.progress==1){
                game.progress=2
                entities.troops.push(new troop(graphics.main,0,440,4,4,2,0,1,90,3,2))
                entities.troops.push(new troop(graphics.main,game.edge.x,440,4,4,2,0,1,270,3,2))
                game.end=false
                triggerEnemies()
                dialogue.timer=120
                dialogue.stack=["They've got backup!"]
                dialogue.talking=['Dukep']
            }
            if(game.end&&game.progress==2){
                game.progress=3
                entities.troops.push(new troop(graphics.main,game.edge.x/2,0,4,4,0,0,1,180,3,2))
                entities.troops.push(new troop(graphics.main,game.edge.x/2,game.edge.y,4,4,0,0,1,0,3,2))
                game.end=false
                triggerEnemies()
            }
            if(game.end&&game.progress==3){
                game.progress=4
                entities.troops.push(new troop(graphics.main,0,440,4,5,0,0,1,90,3,2))
                entities.troops.push(new troop(graphics.main,game.edge.x,440,4,5,0,0,1,270,3,2))
                game.end=false
                triggerEnemies()
                dialogue.timer=120
                dialogue.stack=["Looks like they brought heavy weapons.","Guess we'll need them too."]
                dialogue.talking=['Dukep','Dippy']
                for(let a=0,la=entities.troops.length;a<la;a++){
                    if(entities.troops[a].team==game.player.team){
                        entities.troops[a].primaryKey=5
                        entities.troops[a].secondaryKey=3
                        entities.troops[a].setupStats()
                    }
                }
            }
            if(game.end&&game.progress==4){
                game.progress=5
                entities.troops.push(new troop(graphics.main,game.edge.x/2,0,4,0,3,0,1,180,3,2))
                entities.troops.push(new troop(graphics.main,game.edge.x/2,game.edge.y,4,0,3,0,1,0,3,2))
                game.end=false
                triggerEnemies()
            }
            if(game.end&&game.progress==5){
                game.progress=6
                entities.troops.push(new troop(graphics.main,0,440,4,5,0,0,1,90,3,2))
                entities.troops.push(new troop(graphics.main,game.edge.x,440,4,5,0,0,1,270,3,2))
                entities.troops.push(new troop(graphics.main,game.edge.x/2,0,4,5,0,0,1,180,3,2))
                game.end=false
                triggerEnemies()
            }
            if(game.end&&game.progress==6){
                game.progress=7
                dialogue.timer=120
                dialogue.stack=["Well, we got them.","Let's get out of here, we made a lot of noise...","We should escape before the cops arrive."]
                dialogue.talking=['Dippy','Dippy','Dukep']
            }
            if(game.progress==7&&dialogue.timer<=0){
                transition.trigger=true
                transition.scene='level'
                transition.mission=1
            }
        break
    }
    game.timer++
}