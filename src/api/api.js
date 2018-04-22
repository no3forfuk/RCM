import axios from 'axios'
// import store from '../store/store'
const service = axios.create({
    baseURL: '/api'
})
service.interceptors.request.use(config => {
    // if (store.state.token) {
    //     //config.headers['X-Auth-Token'] = store.state.token
    // }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error)// for debug

        return Promise.reject(error)
    })

module.exports = {
    //登陆
    loginByName(parmas) {
        return service({
            url: '/Login',
            method: 'POST',
            data: parmas || {}
        })
    },
    //获取侧边栏
    getSideBar(parmas) {
        return service({
            url: '/getslidbar',
            method: 'GET',
            data: parmas || {}
        })
    },
    //获取榜单列表
    // /Ranking/index
    getRankList(parmas) {
        return service({
            url: '/Ranking/index',
            method: 'GET',
            data: parmas || {}
        })
    },
    //导入榜单
    importRank(parmas) {
        return service({
            url: '/Ranking/importRanking',
            method: 'POST',
            data: parmas || {}
        })
    }
}

