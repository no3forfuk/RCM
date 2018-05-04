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
    hideFirstRank(params){
        return request({
            url:'/Ranking/FirstHide/' + params,
            method:'GET',
            params:''
        })
    },
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //导入榜单
    importRank(parmas) {
        if (!parmas) return;
        return request({
            url: '/Ranking/importRanking',
            method: 'POST',
            data: parmas || {}
        })
    },
    addPushTask(params) {
        return request({
            url: '/Element/add',
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
            url: '/Ranking/FirstHide/' + params,
            method: 'PUT'
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
    //获取元素列表
    getElementList(params) {
        return request({
            url: '/Element/index',
            method: 'GET',
            params: {
                page: params
            }
        })
    }
}

