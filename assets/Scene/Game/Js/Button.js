cc.Class({
    extends: cc.Component,

    properties: {
        parentNode:{
            default: null,
            type:cc.Node
        },
        
        btNode:{
            default: null,
            type:cc.Node
        },
        
        eventNode:{
            default: null,
            type:cc.Node
        },
        
    },
    
    onLoad: function () {
        
    },

    btIn:function(map, startNumer){
        this.map = map;
        this.startNumer = startNumer;
        this.npc = [];
        var portraitUrl;
        var copy;
        for(var i = 1; i < map.map[`numer` + startNumer].npc[`numer`]; ++i){
            copy = cc.instantiate (this.btNode);
            copy.parent = this.parentNode;
            copy.getComponent(cc.Button).clickEvents[1].customEventData = i;
            portraitUrl = this.map.map[`numer` + this.startNumer].npc[`npc` + i].portraitUrl;
            this.btIcon(portraitUrl, copy.getChildByName("Icon").getComponent(cc.Sprite));
            this.npc.push(copy);
        }
    },
    
    btStartNumer:function(event, startNumer){
        this.startNumer = startNumer;
    },
    
    btMap:function(map){
        this.map = map;
    },
    
    btUp:function(){
        var copy;
        var portraitUrl;
        for(var i = 0; i < this.npc.length; ++i){
            this.npc[i].destroy();
        }
        this.npc = [];
        for(i = 1; i < this.map.map[`numer` + this.startNumer].npc.numer; ++i){
            if(this.map.map[`numer` + this.startNumer].npc[`npc` + i].exist){
                copy = cc.instantiate (this.btNode);
                copy.parent = this.parentNode;
                copy.getComponent(cc.Button).clickEvents[1].customEventData = i;
                portraitUrl = this.map.map[`numer` + this.startNumer].npc[`npc` + i].portraitUrl;
                this.btIcon(portraitUrl, copy.getChildByName("Icon").getComponent(cc.Sprite));
                this.npc.push(copy);
            }
        }
    },
    
    btIcon:function(portraitUrl, copy){
        cc.loader.loadRes(portraitUrl, cc.SpriteFrame, function (error, spriteFrame){
            if (!error) {
                copy.spriteFrame = spriteFrame;
            }
        });
    },
    
    event:function(event, game, i){
        event = event.getCurrentTarget();
        this.eventNode.getComponent("Event").eventUp(this.map, i, this.startNumer, event);
    },
    
    roomTr:function(){
        for(var i = 1; i < this.map.map[`numer`+ this.startNumer].npc.numer; ++i){
            if(this.map.map[`numer`+ this.startNumer].npc[`npc` + i].trigger){
                if(this.map.map[`numer`+ this.startNumer].npc[`npc` + i].exist){
                    this.eventUp(this.map, i, this.startNumer);
                    this.node.parent.getComponent("Game").npcUp(1, 0, i);
                    this.trigger = true;
                    return;
                }
            }else{
                this.trigger = false;
            }
        }
        if(this.trigger){
            this.anim(event, numer);
            this.btStartNumer(event, numer);
        }
    },
    
    eventUp:function(map, i, startNumer){
        this.eventNode.getComponent("Event").eventUp(map, i, startNumer, this.npc[(i - 1)]);
    },
});
