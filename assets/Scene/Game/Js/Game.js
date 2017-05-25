cc.Class({
    extends: cc.Component,

    properties: {
        sound:{
            default: null,
            type: cc.AudioSource
        },
        
        bt:{
            default: [],
            type: cc.Button
        },
        
        map:{
            default: null,
            type: cc.Node
        },
        
        roomLayout:{
            default: null,
            type: cc.Node
        },
        
        baffle:{
            default: null,
            type: cc.Node
        },
        
        event:{
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {
        var soundOpen = cc.sys.localStorage.getItem('sound');
        if(!soundOpen || soundOpen == 1){
            this.sound.volume = 1;
        }else{
            this.sound.volume = 0;
        }
        this.roomLayout.getComponent (cc.Animation);
    },
    

    mainBt: function(){
        var anima = this.node.getComponent (cc.Animation);
        anima.play ().wrapMode = cc.WrapMode.Normal;
        this.sound.play ();
        this.switch = true;
        this.btUp(false);
    },
    
    mainLoad: function(){
        if(this.switch){
            cc.director.loadScene("Main");
        }
    },
    
    mapUp:function(event, pos, bl){
        this.map.setPositionX(pos);
        this.baffle.setPositionX(pos);
        this.btUp(bl);
    },
    
    btUp:function(bl){
        for(var i = 0; i < this.bt.length; ++i){
            this.bt[i].interactable = bl;
        }
    },
    
    npcUp:function(event, pos, bl){
        this.event.runAction(cc.moveTo(0.2, pos, 0));
        this.baffle.setPositionX(pos);
        this.btUp(bl);
    },
    
    eventUp:function(event, pos, bl){
        this.event.runAction(cc.sequence(cc.moveBy(0.2, pos, 0), cc.callFunc(function () {
            this.baffle.setPositionX(pos);
            this.event.getComponent("Event").eventBt2();
            this.event.getChildByName("button3").getComponent(cc.Button).interactable = false;
            this.event.getChildByName("button3").opacity = 0;
        }, this)));
        this.btUp(bl);
    },
});
