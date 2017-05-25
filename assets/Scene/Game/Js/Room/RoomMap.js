const color1 = new cc.Color(0, 255, 255);
const color2 = new cc.Color(255, 255, 255);

cc.Class({
    extends: cc.Component,

    properties: {
        room:{
            default: null,
            type: cc.Node
        },
        
        gameNode:{
            default: null,
            type: cc.Node
        },
        
        roomLayout:{
            default: null,
            type: cc.Node
        },
        
        eventNode:{
            default: null,
            type: cc.Node
        },
        
        largeMap:{
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        this.map = require("1Decamp");
        this.node.setContentSize(this.map.map.maxX * 420, this.map.map.maxY * 180);
        this.number = [0];
        this.startNumer = this.map.map.startNumer;
        this.roomLoad();
        this.roomShow(color1);
        this.node.setPosition(-420 * this.map.map[`numer`+this.map.map.startNumer].roomX + 210, -180* this.map.map[`numer`+this.map.map.startNumer].roomY + 90);
        this.roomLayout.getComponent("Button").btIn(this.map, this.startNumer);
    },
    //加载房间信息
    roomLoad:function(){
        var copy;
        for(var i = 1; i < this.map.map.roomSum; ++i){
            copy = cc.instantiate (this.room);
            copy.parent = this.node;
            copy.setPosition(this.map.map[`numer`+i].roomX * 420 - 210, this.map.map[`numer`+i].roomY * 180 - 90);
            copy.getChildByName("room").getComponent(cc.Button).clickEvents[0].customEventData = this.map.map[`numer`+i].roomnumer;
            copy.getComponent("Room").roomName(this.map.map[`numer`+i].roomKey, this.map.map[`numer`+i].map);
            this.number.push(copy);
        }
    },
    //处理房间以及路线的显示
    roomShow:function(color){
        this.lat = [];
        var direction = this.map.map[`numer`+ this.startNumer].direction;
        var room;
        for(var i = 0; i < 9; ++i){
            if(direction[i] !== 0){
                room = this.number[direction[i]].getComponent("Room");
                //room.roomUp();
                direction[i] == this.startNumer? room.justAc(direction, true, color): room.backAc(i, true, color);
                this.lat.push(direction[i]);
            }
        }
    },
    //在移动时判断是否可移动
    roomIf:function(event, numer){
        for(var i = 1; i < this.map.map[`numer`+ this.startNumer].npc.numer; ++i){
            if(!this.map.map[`numer`+ this.startNumer].npc[`npc` + i].adopt){
                this.eventNode.getComponent("Event").eventUp(this.map, i, this.startNumer);
                this.gameNode.getComponent("Game").npcUp(event, 0, i);
                this.adopt = false;
                return;
            }else{
                this.adopt = true;
            }
        }
        if(this.adopt){
            this.anim(event, numer);
            this.roomLayout.getComponent("Button").btStartNumer(event, numer);
        }
    },
    //可移动时要做的一系列处理
    anim:function(event, numer){
        var eventNode = event.getCurrentTarget().parent;
        var posX = this.number[this.startNumer].getPositionX();
        var posY = this.number[this.startNumer].getPositionY();
        var PosX = eventNode.getPositionX();
        var PosY = eventNode.getPositionY();
        var direction = this.map.map[`numer`+ numer].direction;
        var just;
        this.roomShow(color2);
        for(var i = 0; i < this.lat.length; ++i){
            if(this.lat[i] !== numer){
                just = this.map.map[`numer`+ this.lat[i]].direction;
                this.number[this.lat[i]].getComponent("Room").roomNin(just, numer);
            }
        }
        for(i = 0; i < 9; ++i){
            if(direction[i] !== 0 && direction[i] !== numer && direction[i] !== this.startNumer){
                just = this.map.map[`numer`+ direction[i]].direction;
                this.number[direction[i]].getComponent("Room").roomLin(just, numer, this.number[numer], direction, this.startNumer);
            }
        }
        this.startNumer = numer;
        this.node.runAction(cc.sequence(cc.moveBy(0.27, posX - PosX, posY - PosY), cc.callFunc(function () {
            this.roomShow(color1);
            this.roomLayout.getComponent(cc.Animation).play();
        }, this)));
    },
    //房间及行进路线的颜色变化
    roomColor:function(){
        var startNumer = this.startNumer;
        var largeMap = this.largeMap.getComponent("largeMap");
        largeMap.roomColor(color1, startNumer);
    },
    
    eventBt:function(map, startNumer){
        this.map = map;
        this.startNumer = startNumer;
    },
});
