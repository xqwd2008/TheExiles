cc.Class({
    extends: cc.Component,

    properties: {
        game:{
            default: null,
            type:cc.Node
        },
    },
    
    onLoad: function () {
        
    },
    
    animEnd:function () {
        this.game.getComponent("Battle").distanceIf();
    },
    
    MeleeAttackStart:function(){
        this.node.getComponent(cc.Animation).play("MeleeAttack");
    },
    
    MeleeAttack:function(){
        this.node.getComponent(cc.Animation).play("MeleeRecycling");
    },
    
    FarAttackStart:function(){
        this.node.getComponent(cc.Animation).play("FarAttack");
    },
    
    FarAttack:function(ac){
        this.game.getComponent("Battle").arms(ac);
    },
    
    Attack:function(){
        this.game.getComponent("Battle").actionObject();
    },
    
    Switch:function(){
        this.game.getComponent("Battle").roundRun();
    },
    
    moveX:function(dis, sec){
        if(this.node.name == "Hero"){
            this.node.runAction(cc.moveBy(sec, + dis, 0));
        }else{
            this.node.runAction(cc.moveBy(sec, - dis, 0));
        }
        
    },
});
