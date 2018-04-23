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
            url: '/getslidbar',
            method: 'GET',
            data: parmas || {}
        })
    },
    //获取榜单列表
    // /Ranking/index
    getRankList(parmas) {
        return request({
            url: '/Ranking/index',
            method: 'GET',
            data: parmas || {}
        })
    },
    //导入榜单
    importRank(parmas) {
        if (!parmas) return;
        return request({
            url: '/Ranking/importRanking',
            method: 'POST',
            data: parmas || {}
        })
    }
}

