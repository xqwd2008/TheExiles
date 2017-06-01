cc.Class({
    extends: cc.Component,

    properties: {
        bg:{
            default: null,
            type: cc.Sprite
        },
        
        figure:{
            default: null,
            type: cc.Node
        },
        
        content:{
            default: null,
            type: cc.Label
        },
        
        content2:{
            default: null,
            type: cc.RichText
        },
        
        title:{
            default: null,
            type: cc.Label
        },
        
        buttonNode:{
            default: null,
            type: cc.Node
        },
        
        button:{
            default: [],
            type: cc.Node
        },
        
        nextNode:{
            default: null,
            type: cc.Node
        },
        
        dialogue:{
            default: null,
            type: cc.Node
        },
        
        roomNode:{
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {

    },
    
    eventUp:function(map, i, startNumer, event){
        this.map = map;
        this.startNumer = startNumer;
        this.buttonNode.runAction(cc.fadeTo(0, 0));
        this.npc = map.map[`numer` + this.startNumer].npc[`npc` + i];
        var photoUrl = this.npc.photoUrl;
        var bgUrl = this.npc.bgUrl;
        var figure = this.figure.getComponent(cc.Sprite);
        var bg = this.bg.getComponent(cc.Sprite);
        this.loader(bgUrl, bg);
        this.loader(photoUrl, figure);
        this.title.textKey = this.npc.nameKey;
        if(this.npc.dialog > 1){
            this.textKeyString(this.npc.dialogKey1);
            this.nodeAc(true);
            this.counter = 1;
        }else{
            this.textKeyString(this.npc.dialogKey1);
            this.nodeAc(false);
            this.btBl = true;
            this.eventBt();
        }
    },
    
    loader:function(url, sprite){
        cc.loader.loadRes(url, cc.SpriteFrame, function (error, spriteFrame){
            if (!error) {
                sprite.spriteFrame = spriteFrame;
            }
        });
    },
    
    textKeyString:function(dialogKey){
        this.content.textKey = dialogKey;
        this.content2.string = this.content.string;
    },
    
    nodeAc:function(ac){
        this.nextNode.active = ac;
        this.dialogue.active = ac;
    },
    
    eventAnim:function(){
        this.counter = this.counter + 1;
        this.dialogue.active = false;
        if(this.counter == this.npc.dialog){
            this.nextNode.active = false;
        }
        this.node.getComponent(cc.Animation).play();
    },
    
    eventDialogue:function(){
        this.dialogue.active = true;
        this.textKeyString(this.npc[`dialogKey` + this.counter]);
        if(this.counter == this.npc.dialog){
            this.dialogue.active = false;
            this.btBl = true;
            this.eventBt();
        }
    },
    
    eventBt:function(){
        var copy;
        var sizeX = this.npc.select * 408 + Math.ceil((this.npc.select - 1) * 87);
        this.buttonNode.setContentSize(sizeX, 160);
        for(var i = 0; i < this.npc.select; ++i){
            this.button[i].parent = this.buttonNode;
            this.button[i].getChildByName("label").getComponent(cc.Label).textKey = this.npc[`select` + (i + 1)].nameKey;
            this.button[i].getComponent(cc.Button).clickEvents[0].customEventData = i + 1;
        }
        if(this.btBl){
            this.buttonNode.runAction(cc.fadeTo(0.3, 255));
            this.btBl = false;
        }
    },
    
    eventBt2:function(){
        for(var i = 0; i < 3; ++i){
            this.button[i].setPosition(3000, 3000);
            this.button[i].parent = this.node.parent;
        }
    },
    
    triggerBt:function(event, i){
        var o;
        if(this.npc[`select` + i].battle){
            
        }
        if(this.npc[`select` + i].keyAdopt){
            for(o = 1; o < this.npc.keyAdopt.numer; ++o){
                this.adopt(o);
            }
        }
        if(this.npc[`select` + i].keyNpc){
            for(o = 1; o < this.npc.keyNpc.numer; ++o){
                this.npcIf(o);
            }
            this.node.parent.getChildByName("Room").getComponent("Button").btMap(this.map);
            this.node.parent.getChildByName("Room").getComponent("Button").btUp();
        }
        this.roomNode.getComponent("RoomMap").eventBt(this.map, this.startNumer);
        if(this.npc[`select` + i].End){
            this.i = i;
            this.node.getComponent(cc.Animation).play("EventEbd");
            this.buttonNode.runAction(cc.fadeTo(0.25, 0));
        }else{
            this.node.parent.getComponent("Game").eventUp(1, 2000, true);
        }
    },
    
    adopt:function(i){
        var room = this.npc.keyAdopt[`adopt` + i].room;
        var number = this.npc.keyAdopt[`adopt` + i].number;
        var link = this.npc.keyAdopt[`adopt` + i].link;
        this.map.map[`numer` + room].direction[number] = link;
    },
    
    npcIf:function(i){
        var number = this.npc.keyNpc[`npc` + i].number;
        var npcNumber = this.npc.keyNpc[`npc` + i].npcNumber;
        this.map.map[`numer` + number].npc[`npc` + npcNumber].exist = !this.map.map[`numer` + number].npc[`npc` + npcNumber].exist;
    },
    
    eventEnd:function(){
        this.eventBt2();
        this.textKeyString(this.npc[`select` + this.i].End.EndDialog);
        this.button[3].runAction(cc.fadeTo(0.25, 255));
        this.button[3].getComponent(cc.Button).interactable = true;
    },
});
