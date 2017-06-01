const audio = "Audio";

cc.Class({
    extends: cc.Component,

    properties: {
        
        titleEn:{
            default: null,
            type: cc.Node
        },
        
        
        sound:{
            default: [],
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
        //中英文标题的切换cc.log(1);
        var lang = cc.sys.language;
        var titleurl = "menu/title_ch";
        var title = this.titleEn.getComponent(cc.Sprite);
        if (lang === 'zh') {
            cc.loader.loadRes(titleurl, cc.SpriteFrame, function (error, spriteFrame){
            if (!error) {
                title.spriteFrame = spriteFrame;
            }});
        }
        
        //加载背景音乐和音效的状态
        this.audioSource = this.node.getComponent(audio);
        var musicOpen = cc.sys.localStorage.getItem('music');
        this.audioSource.musicSwitch(musicOpen, this.button[1], this.sound[0]);
        var soundOpen = cc.sys.localStorage.getItem('sound');
        this.audioSource.soundSwitch(soundOpen, this.button[2], this.sound[1]);
        
        //初始化一些函数
        this.reset = this.resetBt.getComponent(cc.Button);
        
        //加载开始游戏与重置游戏的按钮状态
        var gameOpen = cc.sys.localStorage.getItem('game');
        if(gameOpen){
            this.gameLabel.textKey = "Main/Continue";
            this.resetBt.setPositionX(0);
        }
    },
    //点击音乐按钮的回调
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
        this.audioSource.musicSwitch(musicOpen, this.button[1], this.sound[0]);
    },
    //点击音效按钮的回调
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
        this.audioSource.soundSwitch(soundOpen, this.button[2], this.sound[1]);
    },
    //点击开始游戏的回调
    startGame: function(){
        var anima = this.node.getComponent (cc.Animation);
        anima.play ().wrapMode = cc.WrapMode.Normal;
        this.switch = true;
        this.inte(false);
    },
    //加载场景，该函数在过场动画结束时调用
    sceneLoad: function(){
        if(this.switch){
            cc.sys.localStorage.setItem('game', 1);
            cc.director.loadScene("Game");
        }
    },
    //按钮状态的变化
    inte: function(Bl){
        for(var i=0;i<3;++i){
            this.button[i].interactable = Bl;
        }
        this.reset.interactable = Bl;
    },
    //重置游戏时提示窗口的变化
    resetprompt: function(oj,num){
        this.baffle.setPositionX(num);
        this.prompt.setPositionX(num);
        num > 0? this.inte(true):this.inte(false);
    },
    //确定重置游戏时进行调用的函数
    resetGame: function(){
        this.resetBt.setPositionX(2000);
        this.resetprompt(0,2000);
        this.gameLabel.textKey = "Main/StartGame";
        cc.sys.localStorage.removeItem('game');
    },
    //播放音效
    soundPlay: function(){
        !this.click? this.sound[1].play():this.sound[1].stop();
        this.click = false;
    },
});
