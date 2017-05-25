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
    //移动到的房间及路线颜色变化
    justAc:function(direction, ac, color){
        for(var i = 0; i < 9; ++i){
            if(direction[i]){
                this.roomAc(this.direction[i], ac, color);
            }
        }
        this.direction[0].getComponent(cc.Button).interactable = false;
    },
    //与移动到房间相邻的房间链接路线颜色变化
    backAc:function(i, ac, color){
        if(i < 5){
            this.roomAc(this.direction[i + 4], ac, color);
        }else{
            this.roomAc(this.direction[i - 4], ac, color);
        }
        this.direction[0].active = ac;
        this.direction[0].getComponent(cc.Button).interactable = ac;
    },
    //房间的激活与否
    roomAc:function(line, ac, color){
        line.active = ac;
        line.color = color;
    },
    //房间路线的状态变化更新
    /*roomUp:function(){
        for(var i = 0; i < 9; ++i){
            this.direction[i].active = false;
        }
    },*/
    //房间的名字
    roomName:function(map, direction){
        this.label.textKey = map;
        for(var i = 0; i < 9; ++i){
            this.direction[i].name = direction[i];
        }
    },
    //房间消失结束，该函数在动画中触发
    roomLatEnd:function(){
        for(var i = 1; i < 9; ++i){
            this.direction[i].active = false;
        }
        this.node.active = false;
    },
    //房间的显示处理
    roomLin:function(just, numer, btNode, direction, startNumer){
        for(var i = 1; i < 9; ++i){
            if(direction[i] && direction[i] !== startNumer){
                btNode.getChildByName(direction[i]).active = true;
                btNode.getChildByName(direction[i]).getComponent(cc.Animation).play('dis');
            }
            if(just[i] == numer){
                if(!this.direction[0].active){
                    this.direction[0].active = true;
                    this.direction[0].getComponent(cc.Animation).play('dis');
                }
                this.direction[i].active = true;
                this.direction[i].getComponent(cc.Animation).play('dis');
            }
        }
    },
    //房间的隐藏处理
    roomNin:function(just, numer){
        this.bl = false;
        this.lat = false;
        var ac = [];
        for(var i = 1; i < 9; ++i){
            if(just[i] == numer){
                this.bl = true;
                this.lat = true;
            }else{
                this.lat = false;
            }
            if(!this.lat){
                this.direction[i].getComponent(cc.Animation).play();
            }
        }
        if(!this.bl){
            this.direction[0].getComponent(cc.Animation).play();
        }
    },
});
