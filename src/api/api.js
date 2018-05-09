import request from './request'

module.exports = {
    //登陆
    loginByUsername(parmas) {
        return request({
            url: '/Login',
            method: 'POST',
            data: parmas || {}
        })
    },
    //获取侧边栏
    getSideBar(parmas) {
        return request({
            url: '/Index/getMenu',
            method: 'GET',
            data: parmas || {}
        })
    },
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>一级榜单api>>>>>>>>>>>>>>>>>>//
    //获取一级榜单列表
    getFirstRankList(parmas) {
        return request({
            url: '/Ranking/FirstIndex',
            method: 'GET',
            params: ''
        })
    },
    //隐藏一级榜单
    hideFirstRank(params){
        return request({
            url:'/Ranking/FirstHide/' + params,
            method:'POST',
            params:''
        })
    },
    //添加一级榜单
    addFirstRank(params){
        return request({
            url:'/Ranking/FirstAdd',
            method:'POST',
            data:params
        })
    },
    //编辑一级榜单
    editFirstRank(params){
        return request({
            url:'/Ranking/FirstEdit/' +　params.id,
            method:'POST',
            data:params
        })
    },
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>二级榜单>>>>>>>>>>>>>>//
    //导入榜单
    importRank(parmas) {
        if (!parmas) return;
        return request({
            url: '/Ranking/importRanking',
            method: 'POST',
            data: parmas || {}
        })
    },
    //添加推送
    addPushTask(params) {
        return request({
            url: '/Push/add',
            method: 'POST',
            data: params || {}
        })
    },
    //获取二级榜单列表
    getSecondRank(params) {
        return request({
            url: '/Ranking/SecondIndex',
            method: 'GET',
            params: {
                page: params
            }
        })
    },
    //添加二级榜单
    addSecondRank(params) {
        return request({
            url: '/Ranking/SecondAdd',
            method: 'POST',
            data: params || {}
        })
    },
    //隐藏二级榜单
    hideSecondRank(params) {
        return request({
            url: '/Ranking/SecondHide/' + params,
            method: 'POST'
        })
    },
    //编辑二级榜单
    editSecondRank(params) {
        return request({
            url: '/Ranking/SecondEdit/' + params.id,
            method: 'POST',
            data: params || {}
        })
    },
    //获取元素列表>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>元素>>>>>>>>>>>>>>
    getElementList(params) {
        return request({
            url: '/Element/index',//api/Element/hide/
            method: 'GET',
            params: {
                page: params
            }
        })
    },
    hideElement(params) {
        return request({
            url: '/Element/hide/' + params,
            method: 'POST'
        })
    },

}

