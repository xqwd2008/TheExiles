cc.Class({
    extends: cc.Component,

    properties: {
        attribute:{
            default: [],
            type: cc.Label
        },
    },
    
    onLoad: function () {
        var heroInfo = JSON.parse(cc.sys.localStorage.getItem('heroInfo'));
        this.initData = [];
        var init = require("heroInfo");
        
        if(heroInfo){
            this.heroInit(heroInfo);
        }else{
            this.heroInit(init.heroInfo);
        }
    },
    
    heroInit: function(init){
        this.attribute[0].string = init.hp;
        this.initData.push (init.hp);
        this.attribute[1].string = init.mood;
        this.initData.push (init.mood);
        this.attribute[2].string = init.money;
        this.initData.push (init.money);
        this.attribute[3].string = init.faith;
        this.initData.push (init.faith);
        this.attribute[4].string = init.date;
        this.initData.push (init.date);
    },
    
    save: function(){
        var heroInfo = {
            hp: this.initData[0],
            mood: this.initData[1],
            money: this.initData[2],
            faith: this.initData[3],
            date:this.initData[4],
        };
        cc.sys.localStorage.setItem('heroInfo', JSON.stringify(heroInfo));
    },
});
