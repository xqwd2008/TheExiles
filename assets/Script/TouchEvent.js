cc.Class({
    extends: cc.Component,

    properties: {
        
        label: {
            default:null,
            type: cc.Node
        }
    },

    onLoad: function () {
        var labels = this.label;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.log('anxia');
            labels.color = new cc.Color(128, 128, 128);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function () {
            cc.log('songkai');
            labels.color = new cc.Color(128, 128, 128);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            cc.log('songkai');
            labels.color = new cc.Color(255, 255, 255);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            cc.log('songkai');
            labels.color = new cc.Color(255, 255, 255);
        }, this);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
