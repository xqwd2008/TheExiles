cc.Class({
    extends: cc.Component,

    properties: {
        label:{
            default: null,
            type: cc.Label
        },
        
        direction:{
            default: [],
            type: cc.Node
        },
    },

    onLoad: function () {
        
    },
    
    justAc:function(direction, ac){
        for(var i = 0; i < 9; ++i){
            if(direction[i]){
                this.direction[i].active = ac;
            }
        }
    },
    
    roomName:function(map, direction){
        this.label.textKey = map;
        for(var i = 0; i < 9; ++i){
            this.direction[i].name = direction[i];
        }
    },
    
    justColor:function(direction){
        for(var i = 0; i < 9; ++i){
            if(direction[i]){
                this.direction[i].color = new cc.Color(0, 255, 255);
            }
        }
    },
    
    backColor:function(i){
        if(i < 5){
            this.direction[i + 4].color = new cc.Color(0, 255, 255);
        }else{
            this.direction[i - 4].color = new cc.Color(0, 255, 255);
        }
    },
    
    roomUp:function(){
        for(var i = 0; i < 9; ++i){
            this.direction[i].color = new cc.Color(255, 255, 255);
        }
    },
});
