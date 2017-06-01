cc.Class({
    extends: cc.Component,

    properties: {
        heroHead:{
            default: null,
            type:cc.Node
        },
        
        enemyHead:{
            default: null,
            type:cc.Node
        },
        
        hero:{
            default: null,
            type:cc.Node
        },
        
        enemy:{
            default: null,
            type:cc.Node
        },
        
        weapon:{
            default: [],
            type:cc.Node
        },
    },

    onLoad: function () {
        
    },
});
