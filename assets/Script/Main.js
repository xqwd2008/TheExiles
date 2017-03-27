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
        
        ContinueBt:{
            default: null,
            type: cc.Button
        },
        
        
    },
    onLoad: function () {
        let lang = cc.sys.language;
        if (lang !== 'zh') {
            this.titleEn.active = true;
            this.titleCh.active = false;
        }else{
            this.titleEn.active = false;
            this.titleCh.active = true;
        }
        var musicOpen = cc.sys.localStorage.getItem('music');
        cc.log('musicOpen' + musicOpen);
        var musicurl = 'resources/menu/music_on.png';
        var musicSprite = this.musicBt.getComponent(cc.Sprite);
        var soundurl = 'resources/menu/sound_on.png';
        var soundSprite = this.soundBt.getComponent(cc.Sprite);
        cc.log('zujian' + soundSprite);
        if(!musicOpen){
            this.music.play ();
            musicOpen = 1;
            cc.sys.localStorage.setItem('music', musicOpen);
            cc.log('musicOpen'+'+1');
            cc.log(" 开 ");
            musicSprite.spriteFrame.setTexture(cc.url.raw(musicurl));
        }else{
            if(musicOpen == 1) {
                this.music.play ();
                cc.log(" 开 ");
                musicSprite.spriteFrame.setTexture(cc.url.raw(musicurl));
            }else{
                this.music.stop ();
                cc.log(" 关 ");
        }}
        var soundOpen = cc.sys.localStorage.getItem('sound');
        cc.log('soundOpen' + soundOpen);
        if(!soundOpen){
            soundOpen = 1;
            cc.sys.localStorage.setItem('sound', soundOpen);
            soundSprite.spriteFrame.setTexture(cc.url.raw(soundurl));
        }else{
            if(soundOpen == 1){
                soundSprite.spriteFrame.setTexture(cc.url.raw(soundurl));
            }
        }
        this.time = 0.5;
        this.switch = false;

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
        if(soundOpen == 1){
            this.sound.play ();
        }
    },
    
    soundSwitch: function (){
        var soundurl = 'resources/menu/sound_on.png';
        var soundSprite = this.soundBt.getComponent(cc.Sprite);
        var soundOpen = cc.sys.localStorage.getItem('sound');
        if(soundOpen == 1){
            soundOpen = 2;
            cc.sys.localStorage.setItem('sound', soundOpen);
            cc.log("  关  ");
            soundurl = 'resources/menu/sound_off.png';
            soundSprite.spriteFrame.setTexture(cc.url.raw(soundurl));
            
        }else{
            this.sound.play ();
            soundOpen = 1;
            cc.sys.localStorage.setItem('sound', soundOpen);
            cc.log("  开  ");
            soundSprite.spriteFrame.setTexture(cc.url.raw(soundurl));
        }
    },
    
    sceneLoad: function(){
        var anima = this.node.getComponent (cc.Animation);
        anima.play ();
        this.switch = true;
        this.GameBt.interactable = false;
        this.ContinueBt.interactable = false;
    },
    
    update: function (dt) {
        if(this.switch){
            this.time -= dt;
            if(this.time <=0){
                cc.director.loadScene("Game");
            }
        }
    }
    
    /*temporary: function (){
        cc.sys.localStorage.removeItem('sound');
        cc.sys.localStorage.removeItem('music');
    }*/
});
