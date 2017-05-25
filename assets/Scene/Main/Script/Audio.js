cc.Class({
    extends: cc.Component,
    
    properties: {
        
    },

    onLoad: function () {
        
    },
    //音乐按钮图片更换方法
    musicSwitch: function (musicOpen, bt, sou){
        var musicSprite = bt.getComponent(cc.Sprite);
        if(!musicOpen || musicOpen == 1){
            sou.play();
            cc.loader.loadRes('menu/musicOn', cc.SpriteFrame, function (error, spriteFrame){
                if (!error) {
                musicSprite.spriteFrame = spriteFrame;
                }
            });
        }else{
            sou.stop ();
            cc.loader.loadRes('menu/musicOff', cc.SpriteFrame, function (error, spriteFrame){
                if (!error) {
                    musicSprite.spriteFrame = spriteFrame;
                }
            });
        }
    },
    //音效按钮图片更换方法
    soundSwitch: function (soundOpen, bt, sou){
        var soundSprite = bt.getComponent(cc.Sprite);
        if(!soundOpen || soundOpen == 1){
            sou.volume = 1;
            cc.loader.loadRes('menu/soundOn', cc.SpriteFrame, function (error, spriteFrame){
                if (!error) {
                    soundSprite.spriteFrame = spriteFrame;
                }
            });
        }else{
            sou.volume = 0;
            cc.loader.loadRes('menu/soundOff', cc.SpriteFrame, function (error, spriteFrame){
                if (!error) {
                    soundSprite.spriteFrame = spriteFrame;
                }
            });
        }
    },
});
