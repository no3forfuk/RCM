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
            params: parmas || {}
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
    hideFirstRank(params) {
        return request({
            url: '/Ranking/FirstHide/' + params,
            method: 'POST',
            params: params
        })
    },
    //添加一级榜单
    addFirstRank(params) {
        return request({
            url: '/Ranking/FirstAdd',
            method: 'POST',
            data: params
        })
    },
    //编辑一级榜单
    editFirstRank(params) {
        return request({
            url: '/Ranking/FirstEdit/' + params.id,
            method: 'POST',
            data: params
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
        if (!params) {
            params = ''
        }
        return request({
            url: '/Ranking/SecondIndex',
            method: 'GET',
            params: params
        })
    },
    //获取二级榜单详情
    getSecondRankDetails(id) {
        return request({
            url: '/Ranking/SecondDetails',
            method: 'GET',
            params: {
                id:id
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
            method: 'POST',
            data: params
        })
    },
    //编辑二级榜单
    editSecondRank(params) {
        return request({
            url: '/Ranking/SecondEdit',
            method: 'POST',
            data: params || {}
        })
    },
    //获取元素列表>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>元素>>>>>>>>>>>>>>
    getElementList(params) {
        return request({
            url: '/Element/index',
            method: 'GET',
            params: params
        })
    },
    //隐藏元素
    hideElement(params) {
        return request({
            url: '/Element/hide/' + params,
            method: 'POST'
        })
    },
    //获取元素详情
    getElementDetails(params) {
        return request({
            url: '/Element/details',
            method: 'GET',
            params: {
                id: params
            }
        })
    },
    //编辑元素
    editElementInfo(params) {
        return request({
            url: '/Element/edit',
            method: 'POST',
            data: params
        })
    },
    //推送任务列表
    getPushTaskList(params) {
        return request({
            url: '/pushTask/list',
            method: 'POST',
            data: {
                time: params
            }
        })
    },
    //查询榜单
    serachRankList(params) {
        return request({
            url: '/search/ranking',
            method: 'POST',
            data: {
                key: params
            }
        })
    },
    //获取七牛TOKEN
    get7NiuToken() {
        return request({
            url: '/Qiniu/getUploadToken',
            method: 'GET',
            params: ''
        })
    }

}

