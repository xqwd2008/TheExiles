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
        
        musicBt:{
            default: null,
            type: cc.Button
        },
        
        soundBt:{
            default: null,
            type: cc.Button
        },
        
        GameBt:{
            default: null,
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
        //载入时播放动画
        var anima = this.node.getComponent (cc.Animation);
        anima.play ().wrapMode = cc.WrapMode.Reverse;
        //背景音乐的处理
        cc.sys.localStorage.removeItem('music');
        cc.sys.localStorage.removeItem('sound');
        var musicOpen = cc.sys.localStorage.getItem('music');
        this.musicSwitch(musicOpen);
        var soundOpen = cc.sys.localStorage.getItem('sound');
        this.soundSwitch(soundOpen);
        //初始化一些函数
        this.time = 15;
        this.switch = false;
        //按钮状态
        var gameOpen = cc.sys.localStorage.getItem('game');
        if(gameOpen){
            this.gameLabel.textKey = "Continue";
            this.resetBt.active = true;
        }
    },
    
    musicSwitch: function (musicOpen){
        var musicurl = null;
        var musicSprite = this.musicBt.getComponent(cc.Sprite);
        if(!musicOpen || musicOpen == 1){
            this.music.play();
            musicurl = 'menu/musicOn';
            cc.loader.loadRes(musicurl, cc.SpriteFrame, function (error, spriteFrame){
                if (!error) {
                musicSprite.spriteFrame = spriteFrame;
                }
            });
        }else{
            this.music.stop ();
            musicurl = 'menu/musicOff';
            cc.loader.loadRes(musicurl, cc.SpriteFrame, function (error, spriteFrame){
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
        this.sound.play();
    },
    
    soundSwitch: function (soundOpen){
        var soundurl = null;
        var soundSprite = this.soundBt.getComponent(cc.Sprite);
        if(!soundOpen || soundOpen == 1){
            this.sound.volume = 1;
            soundurl = 'menu/soundOn';
            cc.loader.loadRes(soundurl, cc.SpriteFrame, function (error, spriteFrame){
                if (!error) {
                    soundSprite.spriteFrame = spriteFrame;
                }
            });
        }else{
            this.sound.volume = 0;
            soundurl = 'menu/soundOff';
            cc.loader.loadRes(soundurl, cc.SpriteFrame, function (error, spriteFrame){
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
            cc.loader.releaseRes("menu/soundOn", cc.SpriteFrame);
        }else{
            soundOpen = 1;
            cc.loader.releaseRes("menu/soundOff", cc.SpriteFrame);
        }
        cc.sys.localStorage.setItem('sound', soundOpen);
        this.soundSwitch(soundOpen);
        this.sound.play();
    },
    
    startGame: function(){
        var anima = this.node.getComponent (cc.Animation);
        anima.play ().wrapMode = cc.WrapMode.Normal;
        this.switch = true;
        this.GameBt.interactable = false;
        this.resetBt.interactable = false;
        this.musicBt.interactable = false;
        this.soundBt.interactable = false;
        this.sound.play();
    },

    update: function (dt) {
        if(this.switch){
            this.time -= 1;
            if(this.time ===0 ){
                this.switch = false;
                this.GameBt.interactable = true;
                this.resetBt.interactable = true;
                this.musicBt.interactable = true;
                this.soundBt.interactable = true;
                cc.sys.localStorage.setItem('game', 1);
                cc.director.loadScene("Game");
            }
        }
    },
    
    resetprompt: function(){
        this.baffle.setPositionX(0);
        this.prompt.setPositionX(0);
        this.sound.play();
    },
    
    resetGame: function(){
        this.resetBt.active = false;
        this.baffle.setPositionX(2000);
        this.prompt.setPositionX(2000);
        this.gameLabel.textKey = "Start Game";
        cc.sys.localStorage.removeItem('game');
        this.sound.play();
    },
    
    resetcancel: function(){
        this.baffle.setPositionX(2000);
        this.prompt.setPositionX(2000);
        this.sound.play();
    }
});
