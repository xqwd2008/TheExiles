cc.Class({
    extends: cc.Component,

    properties: {
        sound:{
            default: null,
            type: cc.AudioSource
        }
    },

    // use this for initialization
    onLoad: function () {
        var anima = this.node.getComponent (cc.Animation);
        cc.log(anima);
        anima.play ();
        var soundOpen = cc.sys.localStorage.getItem('sound');
        cc.log("sound" + soundOpen);
        if(soundOpen == 1){
            this.sound.volume = 1;
            cc.log('kai');
        }else{
            this.sound.volume = 0;
            cc.log('guan');
        }
        this.time = 0.5;
        this.switch = false;
    },
    
    mainLoad: function(){
        var anima = this.node.getComponent (cc.Animation);
        anima.play ().wrapMode = cc.WrapMode.Reverse;
        this.sound.play ();
        this.switch = true;
    },
    
    update: function (dt) {
        if(this.switch){
            this.time -= dt;
            if(this.time <=0){
                cc.director.loadScene("Main");
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
