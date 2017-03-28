const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        
        titleEn:{
            default: null,
            type: cc.Node
        },
        
        titleCh:{
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
            type: cc.Node
        },
        
        soundBt:{
            default: null,
            type: cc.Node
        },
        
        GameBt:{
            default: null,
            type: cc.Button
        },
        
        ResetBt:{
            default: null,
            type: cc.Node
        },
        
        gameLabel:{
            default: null,
            type: cc.Label
        },
        
        promptNode:{
            default: null,
            type: cc.Node
        },
        
        baffle:{
            default: null,
            type: cc.Node
        },
        
    },
    
    onLoad: function () {
        //根据设备语言判断显示标题图片
        let lang = cc.sys.language;
        if (lang !== 'zh') {
            this.titleEn.active = true;
            this.titleCh.active = false;
        }else{
            this.titleEn.active = false;
            this.titleCh.active = true;
        }
        //根据存档情况判断按钮状态
        var save = cc.sys.localStorage.getItem('save');
        cc.log('save' + save);
        if(save){
            this.gameLabel.textKey = i18n.t("Continue");
            cc.log(save);
            this.ResetBt.active = true;
        }
        //载入时播放动画
        var anima = this.node.getComponent (cc.Animation);
        anima.play ().wrapMode = cc.WrapMode.Reverse;
        //根据存档判断是否播放音乐以及处理音乐音效的当前状态
        var musicOpen = cc.sys.localStorage.getItem('music');
        var musicurl = 'resources/menu/music_on.png';
        var musicSprite = this.musicBt.getComponent(cc.Sprite);
        var soundurl = 'resources/menu/sound_on.png';
        var soundSprite = this.soundBt.getComponent(cc.Sprite);
        if(!musicOpen){
            this.music.play ();
            musicOpen = 1;
            cc.sys.localStorage.setItem('music', musicOpen);
            musicSprite.spriteFrame.setTexture(cc.url.raw(musicurl));
        }else{
            if(musicOpen == 1) {
                this.music.play ();
                musicSprite.spriteFrame.setTexture(cc.url.raw(musicurl));
            }else{
                this.music.stop ();
        }}
        var soundOpen = cc.sys.localStorage.getItem('sound');
        if(!soundOpen){
            soundOpen = 1;
            cc.sys.localStorage.setItem('sound', soundOpen);
            soundSprite.spriteFrame.setTexture(cc.url.raw(soundurl));
            cc.log('1');
        }else{
            if(soundOpen == 1){
                this.sound.volume = 1;
                soundSprite.spriteFrame.setTexture(cc.url.raw(soundurl));
            }else{
                this.sound.volume = 0;
            }
        }
        //切换场景时使用
        this.time = 0.5;
        this.switch = false;
        this.promptNode;

    },
    
    musicSwitch: function (){
        var soundOpen = cc.sys.localStorage.getItem('sound');
        var musicOpen = cc.sys.localStorage.getItem('music');
        var musicurl = 'resources/menu/music_off.png';
        var musicSprite = this.musicBt.getComponent(cc.Sprite);
        cc.log(musicOpen);
        if(musicOpen == 1){
            this.music.stop ();
            musicOpen = 2;
            cc.sys.localStorage.setItem('music', musicOpen);
            cc.log("  关  ");
            musicurl = 'resources/menu/music_off.png';
            musicSprite.spriteFrame.setTexture(cc.url.raw(musicurl));
        }else{
            this.music.play ();
            musicOpen = 1;
            cc.sys.localStorage.setItem('music', musicOpen);
            cc.log("  开  ");
            musicurl = 'resources/menu/music_on.png';
            musicSprite.spriteFrame.setTexture(cc.url.raw(musicurl));
        }
        this.sound.play ();
    },
    
    soundSwitch: function (){
        var soundurl = 'resources/menu/sound_on.png';
        var soundSprite = this.soundBt.getComponent(cc.Sprite);
        var soundOpen = cc.sys.localStorage.getItem('sound');
        if(soundOpen == 1){
            soundOpen = 2;
            this.sound.volume = 0;
            cc.sys.localStorage.setItem('sound', soundOpen);
            soundurl = 'resources/menu/sound_off.png';
            soundSprite.spriteFrame.setTexture(cc.url.raw(soundurl));
            
        }else{
            this.sound.volume = 1;
            soundOpen = 1;
            cc.sys.localStorage.setItem('sound', soundOpen);
            soundurl = 'resources/menu/sound_on.png';
            soundSprite.spriteFrame.setTexture(cc.url.raw(soundurl));
        }
        this.sound.play ();
    },
    
    sceneLoad: function(){
        var soundOpen = cc.sys.localStorage.getItem('sound');
        if(soundOpen == 1){
            this.sound.play ();
        }
        var anima = this.node.getComponent (cc.Animation);
        anima.play ().wrapMode = cc.WrapMode.Normal;
        this.switch = true;
        this.GameBt.interactable = false;
        this.ResetBt.interactable = false;
        var save = 1;
        cc.sys.localStorage.setItem('save', save);
    },
    
    prompt: function(){
        var soundOpen = cc.sys.localStorage.getItem('sound');
        this.sound.play ();
        this.baffle.active = true;
        this.promptNode.active = true;
        this.GameBt.interactable = false;
        this.ResetBt.interactable = false;

    },
    
    resetGmae: function(){
        this.sound.play();
        this.ResetBt.active = false;
        this.promptNode.active = false;
        this.baffle.active = false;
        this.GameBt.interactable = true;
        this.ResetBt.interactable = true;
        this.gameLabel.textKey = i18n.t("Start Game");
        cc.sys.localStorage.removeItem('save');
        cc.sys.localStorage.removeItem('sound');
        cc.sys.localStorage.removeItem('music');
        
    },
    
    cancel: function(){
        this.sound.play ();
        this.baffle.active = false;
        this.promptNode.active = false;
        this.GameBt.interactable = true;
        this.ResetBt.interactable = true;
    },
    
    update: function (dt) {
        if(this.switch){
            this.time -= dt;
            if(this.time <=0){
                cc.director.loadScene("Game");
            }
        }
    },
});
