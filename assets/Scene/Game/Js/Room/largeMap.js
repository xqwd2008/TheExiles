const color2 = new cc.Color(255, 255, 255);
cc.Class({
    extends: cc.Component,

    properties: {
        room:{
            default: null,
            type: cc.Node
        },
        
        mapTitle:{
            default: null,
            type: cc.Label
        },
    },

    onLoad: function () {
        this.map = require("1Decamp");
        this.node.setContentSize(this.map.map.maxX * 420 + 962, this.map.map.maxY * 180 + 1120);
        this.number = [0];
        this.startNumer = this.map.map.startNumer;
        this.roomLoad();
        this.roomShow();
        this.mapTitle.textKey = this.map.map.name;
    },
    
    roomLoad:function(){
        var copy;
        for(var i = 1; i < this.map.map.roomSum; ++i){
            copy = cc.instantiate (this.room);
            copy.parent = this.node;
            copy.setPosition(this.map.map[`numer`+i].roomX * 420 + 691, this.map.map[`numer`+i].roomY * 180 + 653);
            copy.getComponent("largeRoom").roomName(this.map.map[`numer`+i].roomKey, this.map.map[`numer`+i].map);
            this.number.push(copy);
        }
    },
    
    roomShow:function(){
        var direction;
        for(var i = 1; i < this.map.map.roomSum; ++i){
            direction = this.map.map[`numer`+ i].map;
            this.number[i].getComponent("largeRoom").justAc(direction, true);
        }
    },
    
    roomColor:function(color, startNumer){
        var direction = this.map.map[`numer`+ this.startNumer].map;
        var room;
        for(var i = 0; i < 9; ++i){
            if(direction[i] !== 0){
                this.number[direction[i]].getComponent("largeRoom").roomUp();
            }
        }
        this.startNumer = startNumer;
        direction = this.map.map[`numer`+ this.startNumer].map;
        for(i = 0; i < 9; ++i){
            if(direction[i] !== 0){
                room = this.number[direction[i]].getComponent("largeRoom");
                direction[i] == startNumer? room.justColor(direction): room.backColor(i);
            }
        }
        this.node.setPosition(-420 * this.map.map[`numer`+ startNumer].roomX - 691, -180* this.map.map[`numer`+ startNumer].roomY - 653);
    }
});
