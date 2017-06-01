const data = require("2CombatData");

cc.Class({
    extends: cc.Component,

    properties: {
        heroHead:{
            default: null,
            type:cc.Node
        },
        
        enemyHead:{
            default: null,
            type:cc.Node
        },
        
        hero:{
            default: null,
            type:cc.Node
        },
        
        enemy:{
            default: null,
            type:cc.Node
        },
        
        weapon:{
            default: [],
            type:cc.Node
        },
    },

    onLoad: function () {
        this.head();
        this.anim();
        if(data.data.Archer.spd < data.data.Berserker.spd){
            this.action = false;
        }else{
            this.action = true;
        }
        this.node.getComponent(cc.Animation).play();
    },
    //加载头像
    head:function(){
        this.loader(data.data.Berserker.url1, this.enemyHead.getComponent(cc.Sprite), true, cc.SpriteFrame);
        this.loader(data.data.Archer.url1, this.heroHead.getComponent(cc.Sprite), true, cc.SpriteFrame);
    },
    //加载动画
    anim:function(){
        data.data.Archer.distance?this.loader(data.data.Archer.url3, this.hero.getComponent(cc.Sprite), true, cc.SpriteFrame):
        this.loader(data.data.Archer.url2, this.hero.getComponent(cc.Sprite), true, cc.SpriteFrame);
        
        data.data.Berserker.distance?this.loader(data.data.Berserker.url3, this.enemy.getComponent(cc.Sprite), true, cc.SpriteFrame):
        this.loader(data.data.Berserker.url2, this.enemy.getComponent(cc.Sprite), true, cc.SpriteFrame);
        
        this.animFor(data.data.Berserker, this.enemy.getComponent(cc.Animation), false, cc.AnimationClip,`anim`);
        this.animFor(data.data.Archer, this.hero.getComponent(cc.Animation), false, cc.AnimationClip,`anim`);
    },
    //动画加载循环
    animFor:function(character, component, bl, type, category){
        for(var i = 1; i < character.anim; ++i){
            this.loader(character[category + i], component, bl, type);
        }
    },
    //进行加载
    loader:function(url, sprite, bl, type){
        cc.loader.loadRes(url, type, function (error, spriteFrame){
            if (!error) {
                bl?sprite.spriteFrame = spriteFrame:sprite.addClip(spriteFrame);
            }
        });
    },
    //回合对象
    actionObject:function(){
        if(this.action){
            this.round = this.hero;
            this.match = this.enemy;
            this.enemyDis = this.roundDis;
            this.roundDis = this.heroDis;
            this.cor = -430;
            this.corX = -300;
            this.dis = data.data.Archer;
        }else{
            this.round = this.enemy;
            this.match = this.hero;
            this.heroDis = this.roundDis;
            this.roundDis = this.enemyDis;
            this.cor = 430;
            this.corX = 300;
            this.dis = data.data.Berserker;
        }
    },
    //开局双方位置进场
    distance:function(event, dis){
        if(!data.data.Archer.distance && !data.data.Berserker.distance){
            this.heroDis = 0;
            this.enemyDis = 0;
            this.roundDis = 0;
        }else{
            this.heroDis = 1;
            this.enemyDis = 1;
            this.roundDis = 1;
        }
        this.actionObject();
        this.range = this.heroDis+this.enemyDis;
        this.hero.runAction(cc.sequence(cc.moveBy(0, 0, data.data.Archer.correctY),cc.moveTo(0.2, (-300*this.enemyDis - 430 + data.data.Archer.correct), (-200 + data.data.Archer.correctY))));
        this.enemy.runAction(cc.sequence(cc.moveBy(0, 0, data.data.Berserker.correctY),cc.moveTo(0.2, (300*this.heroDis + 430 + data.data.Berserker.correct),(-200 + data.data.Berserker.correctY)), cc.moveBy(0.5, 0, 0),cc.callFunc(function () {
            this.distanceIf();
        }, this)));
    },
    //战斗时的位置调整
    distanceIf:function(){
        this.match.setSiblingIndex(0);
        this.anima = this.dis.Far;
        this.roundX = this.round.getPositionX();
        this.roundY = this.round.getPositionY();
        if(!this.dis.distance||(this.dis.Combat&&!this.range)){
            this.anima = this.dis.Melee;
        }
        if(this.dis.distance >= this.range){
            if(this.dis.Combat&&this.range){
                this.round.getComponent(cc.Animation).play("Switch");
                this.roundDis = this.roundDis- 1;
                this.range = this.range - 1;
                this.anima = this.dis.Melee;
            }else{
                if(this.range === 0){
                    if(!this.SwitchBl){
                        this.anima = this.dis.Melee;
                        this.round.getComponent("Character").SwitchPlay();
                    }
                }else{
                    this.SwitchPlay();
                }
            }
        }else{
            this.roundDis = this.roundDis - 1;
            this.range = this.range - 1;
            this.roundRun();
        }
    },
    //位置行动
    roundRun:function(){
        this.round.runAction(cc.sequence(cc.moveTo(0.1, this.corX*this.roundDis + this.cor + this.dis.correct, -200 + this.dis.correctY), cc.moveBy(0.2, 0, 0), cc.callFunc(function () {
            if(this.dis.distance >= this.range){
                this.round.getComponent(cc.Animation).play(this.anima);
                this.action = !this.action;
            }else{
                this.action = !this.action;
                this.actionObject();
            }
            this.roundX = this.round.getPositionX();
            this.roundY = this.round.getPositionY();
        }, this)));
    },
    //投射判定
    arms:function(ac){
        if(ac == "castAx"){
            this.castAx();
        }else{
            ac == "arrow"?this.arrow():this.javelin();
        }
    },
    //投斧
    castAx:function(){
        this.armsUp(this.weapon[0]);
        this.weapon[0].runAction(cc.sequence(cc.moveTo(0.3, cc.p(this.match.getPositionX(), this.round.getPositionY()+this.dis.shot.inY + this.dis.shot.upY)).easing(cc.easeCircleActionOut()),
        cc.moveTo(0.3, cc.p(this.round.getPositionX() + this.dis.shot.outX, this.round.getPositionY() + this.dis.shot.outY)).easing(cc.easeCircleActionIn()),
        cc.callFunc(function () {
            this.weapon[0].getComponent(cc.Animation).stop();
            this.weapon[0].opacity = 0;
            this.round.getComponent(cc.Animation).play("FarRecycling");
            this.actionObject();
        }, this)));
    },
    //箭矢
    arrow:function(){
        this.armsUp(this.weapon[1]);
        this.weapon[1].runAction(cc.sequence(cc.moveTo(0.1, this.match.getPositionX() + this.dis.range, this.roundY + this.dis.shot.outY),
        cc.callFunc(function () {
            this.weapon[1].opacity = 0;
            this.weapon[1].getComponent(cc.Animation).stop();
            this.round.getComponent(cc.Animation).play("FarRecycling");
            this.actionObject();
        }, this)));
        
    },
    //标枪
    javelin:function(){
        this.armsUp(this.weapon[2]);
        this.weapon[2].runAction(cc.sequence(cc.moveTo(0.15, cc.p(500, this.match.getPositionY()+200)).easing(cc.easeCircleActionOut()),
        cc.callFunc(function () {
            this.weapon[2].getComponent(cc.Animation).stop();
            this.weapon[2].opacity = 0;
            this.round.getComponent(cc.Animation).play("FarRecycling");
            this.actionObject();
        }, this)));
    },
    //投射物位置
    armsUp:function(node){
        node.setPosition(this.roundX + this.dis.shot.inX, this.roundY + this.dis.shot.inY);
        node.opacity = 255;
        node.scaleX = this.round.scaleX;
        node.getComponent(cc.Animation).play();
    },
    //切换武器动作
    SwitchPlay:function(){
        this.round.getComponent(cc.Animation).play(this.anima);
        this.action = !this.action;
    },
});
