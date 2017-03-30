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
        var soundOpen = cc.sys.localStorage.getItem('sound');
        if(!soundOpen || soundOpen == 1){
            this.sound.volume = 1;
        }else{
            this.sound.volume = 0;
        }
        this.switch = false;
    },
    
    mainBt: function(){
        var anima = this.node.getComponent (cc.Animation);
        anima.play ().wrapMode = cc.WrapMode.Normal;
        this.sound.play ();
        this.switch = true;
    },
    
    mainLoad: function(){
        if(this.switch){
            this.switch = false;
            cc.director.loadScene("Main");
        }
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
