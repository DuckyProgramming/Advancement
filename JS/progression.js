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
            if(game.timer==0){
                dialogue.timer=120
                dialogue.stack=["Come on, Duckipo, they're up ahead.","Let's show them what we're made of."]
                dialogue.talking=['Dippy','Dippy']
            }
            if(game.end){
                transition.trigger=true
                transition.scene='level'
                transition.mission=1
            }
        break
    }
    game.timer++
}