cc.Class({
    extends: cc.Component,

    properties: {
        
        titleEn:{
            default: null,
            type: cc.Node
        },
        
        music:{
            default: null,
            type: cc.AudioSource
        },
        
        sound:{
            default: null,
            type: cc.AudioSource
        },
        
        button:{
            default: [],
            type: cc.Button
        },
        
        resetBt:{
            default: null,
            type: cc.Node
        },
        
        prompt:{
            default: null,
            type: cc.Node
        },
        
        baffle:{
            default: null,
            type: cc.Node
        },
        
        gameLabel:{
            default: null,
            type: cc.Label
        }
        
    },
    onLoad: function () {
        //中英文标题情况
        let lang = cc.sys.language;
        var titleurl = "menu/title_ch";
        var title = this.titleEn.getComponent(cc.Sprite);
        if (lang === 'zh') {
            cc.loader.loadRes(titleurl, cc.SpriteFrame, function (error, spriteFrame){
            if (!error) {
                title.spriteFrame = spriteFrame;
            }});
        }
        //背景音乐的处理
        var musicOpen = cc.sys.localStorage.getItem('music');
        this.musicSwitch(musicOpen);
        var soundOpen = cc.sys.localStorage.getItem('sound');
        this.soundSwitch(soundOpen);
        //初始化一些函数
        this.switch = false;
        this.number = 0;
        this.reset = this.resetBt.getComponent(cc.Button);
        //按钮状态
        var gameOpen = cc.sys.localStorage.getItem('game');
        if(gameOpen){
            this.gameLabel.textKey = "Continue";
            this.resetBt.setPositionX(0);
        }

    },
    
    musicSwitch: function (musicOpen){
        var musicSprite = this.button[1].getComponent(cc.Sprite);
        if(!musicOpen || musicOpen == 1){
            this.music.play();
            cc.loader.loadRes('menu/musicOn', cc.SpriteFrame, function (error, spriteFrame){
                if (!error) {
                musicSprite.spriteFrame = spriteFrame;
                }
            });
        }else{
            this.music.stop ();
            cc.loader.loadRes('menu/musicOff', cc.SpriteFrame, function (error, spriteFrame){
                if (!error) {
                    musicSprite.spriteFrame = spriteFrame;
                }
            });
        }
    },

    musicClick: function(){
        var musicOpen = cc.sys.localStorage.getItem('music');
        if(!musicOpen || musicOpen == 1){
            musicOpen =2;
            cc.loader.releaseRes("menu/musicOn", cc.SpriteFrame);
        }else{
            musicOpen =1;
            cc.loader.releaseRes("menu/musicOff", cc.SpriteFrame);
        }
        cc.sys.localStorage.setItem('music', musicOpen);
        this.musicSwitch(musicOpen);
    },
    
    soundSwitch: function (soundOpen){
        var soundurl = null;
        var soundSprite = this.button[2].getComponent(cc.Sprite);
        if(!soundOpen || soundOpen == 1){
            this.sound.volume = 1;
            cc.loader.loadRes('menu/soundOn', cc.SpriteFrame, function (error, spriteFrame){
                if (!error) {
                    soundSprite.spriteFrame = spriteFrame;
                }
            });
        }else{
            this.sound.volume = 0;
            cc.loader.loadRes('menu/soundOff', cc.SpriteFrame, function (error, spriteFrame){
                if (!error) {
                    soundSprite.spriteFrame = spriteFrame;
                }
            });
        }
    },
    
    soundClick: function(){
        var soundOpen = cc.sys.localStorage.getItem('sound');
        if(!soundOpen || soundOpen == 1){
            soundOpen = 2;
            this.click = true;
            cc.loader.releaseRes("menu/soundOn", cc.SpriteFrame);
        }else{
            soundOpen = 1;
            cc.loader.releaseRes("menu/soundOff", cc.SpriteFrame);
        }
        cc.sys.localStorage.setItem('sound', soundOpen);
        this.soundSwitch(soundOpen);
    },
    
    startGame: function(){
        var anima = this.node.getComponent (cc.Animation);
        anima.play ().wrapMode = cc.WrapMode.Normal;
        this.switch = true;
        var Bl = false;
        this.inte(Bl);
    },
    
    sceneLoad: function(){
        if(this.switch){
            cc.sys.localStorage.setItem('game', 1);
            cc.director.loadScene("Game");
        }
    },
    
    inte: function(Bl){
        for(var i=0;i<3;++i){
            this.button[i].interactable = Bl;
        }
        this.reset.interactable = Bl;
    },

    resetprompt: function(oj,num){
        cc.log(num);
        this.baffle.setPositionX(num);
        this.prompt.setPositionX(num);
        num > 0? this.reset.interactable = true:this.reset.interactable = false;
    },
    
    resetGame: function(){
        this.resetBt.setPositionX(2000);
        this.resetprompt(0,2000);
        this.gameLabel.textKey = "Start Game";
        cc.sys.localStorage.removeItem('game');
    },
    
    soundPlay: function(){
        !this.click? this.sound.play():this.sound.stop();
        this.click = false;
    },
});
