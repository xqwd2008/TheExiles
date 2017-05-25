var npc = {
    npc1:{
        exist : true,//NPC是否显示
        adopt : true,//NPC存在时是否通行
        trigger : false,//是否一进入就触发
        //与该NPC互动会影响别的NPC
        keyNpc : {
            numer : 3,//影响的NPC数量
            npc1:{
                number : 14,//影响的NPC房间编号
                npcNumber : 1,//影响的NPC编号
            },
            npc2:{
                number : 15,//影响的NPC房间编号
                npcNumber : 1,//影响的NPC编号
            },
        },
        //与该NPC互动会影响房间路线
        keyAdopt : {
            numer : 2,//影响的路线数量
            adopt1:{
                room : 14,
                number : 3,//影响的路线编号
                link : 13,//所改变的链接房间号
             },
        },
        bgUrl : "scene/5",//NPC的背景
        portraitUrl : "room/knight",//NPC的头像
        photoUrl : "character/Charles",//NPC的人物图
        nameKey : "Decamp/name/knight",//NPC的名字
        dialog : 4,//对话的数量
        dialogKey1 : "Decamp/Event/Npc/knight/dialogue/1",
        dialogKey2 : "Decamp/Event/Npc/knight/dialogue/2",
        dialogKey3 : "Decamp/Event/Npc/knight/dialogue/3",
        dialogKey4 : "Decamp/Event/Npc/knight/dialogue/4",
        select:1,//选择项的数量
        select1 : {
            nameKey : "Decamp/Event/Npc/knight/select/GoodLuck",//按钮文字
            battle : false,//是否会触发战斗
            keyAdopt : true,//是否改变路线
            keyNpc : true,//是否改变NPC
            //dis : false,//自身是否会消失
            replace : false,//是否会替换为别的NPC
            End:{
                EndDialog:"Decamp/Event/Npc/knight/End/1",
                EndButton:"Decamp/Event/Npc/knight/select/Leave",
            },
        },
    },
    npc2: {
        exist : false,
        adopt : true,
        trigger : true,
        keyNpc : {
            numer : 3,
            npc1:{
                number : 16,
                npcNumber : 1,
            },
            npc2:{
                number : 14,
                npcNumber : 1,
            },
        },
        keyAdopt : {
            numer : 2,
            adopt1:{
                room : 15,
                number : 7,
                link : 16,
            },
        },
        bgUrl : "scene/5",
        portraitUrl : "room/knight",
        photoUrl : "character/Charles",
        nameKey : "Decamp/name/knight",
        dialog : 2,
        dialogKey1 : "Decamp/Event/Npc/knight/dialogue/5",
        dialogKey2 : "Decamp/Event/Npc/knight/dialogue/6",
        select:1,
        select1 : {
            nameKey : "Decamp/Event/Npc/knight/select/What",
            battle : false,
            keyAdopt : true,
            keyNpc : true,
            dis : true,
            replace : false,
            End:false,
        },
    },
    npc3: {
                exist : false,
                adopt : true,
                trigger : false,
                keyNpc : {
                    numer : 3,
                    npc1:{
                        number : 16,
                        npcNumber : 1,
                    },
                    npc2:{
                        number : 16,
                        npcNumber : 2,
                    },
                },
                keyAdopt : {
                    numer : 0,
                    adopt1:{
                        room : 15,
                        number : 7,
                        link : 16,
                    }
                },
                bgUrl : "scene/5",
                portraitUrl : "room/knight",
                photoUrl : "character/QiShi",
                nameKey : "Decamp/name/knight",
                dialog : 2,
                dialogKey1 : "Decamp/Event/Npc/knight/dialogue/7",
                dialogKey2 : "Decamp/Event/Npc/knight/dialogue/8",
                select:2,
                select1 : {
                    nameKey : "Decamp/Event/Npc/knight/select/Search",
                    battle : false,
                    keyAdopt : false,
                    keyNpc : true,
                    dis : false,
                    replace : true,
                    End:false,
                },
                select2 : {
                    nameKey : "Decamp/Event/Npc/knight/select/Salute",
                    battle : false,
                    keyAdopt : false,
                    keyNpc : false,
                    dis : false,
                    replace : false,
                    End:false,
                },
            },
};

module.exports = {
    npc,
};