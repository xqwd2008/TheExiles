cc.Class({
    extends: cc.Component,

    properties: {
        sound:{
            default: null,
            type: cc.AudioSource
        },
    },

    // use this for initialization
    onLoad: function () {
        var anima = this.node.getComponent (cc.Animation);
        anima.play ();
        var soundOpen = cc.sys.localStorage.getItem('sound');
        if(!soundOpen || soundOpen === 1){
            this.sound.volume = 1;
        }else{
            this.sound.volume = 0;
        }
        this.time = 30;
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
            this.time = this.time - 1;
            if(this.time === 0){
                cc.director.loadScene("Main");
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
