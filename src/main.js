import Vue from "vue";
import App from "./app.vue";

//引入工具函数
import utils from './utils/utils';

//自定义组件引入
require('./components/components.js');
import './static/font/iconfont.css'
//vuex
import Vuex from 'vuex';



Vue.use(Vuex);
const storeConfig = require('./store/store');
const store = new Vuex.Store(storeConfig);
import {mapState} from 'vuex';


import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
const echarts = require('echarts')
Vue.prototype.echarts = echarts;


//router
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import routerConfig from './router/router.js';

const router = new VueRouter(routerConfig);

//七牛JS-SDK

const qiniu = require('qiniu-js');
Vue.prototype.qiniu = qiniu;
//权限控制

router.beforeEach((to, from, next) => {
    const isLogin = !!sessionStorage.getItem('X-Auth-Token');
    if (isLogin) {
        next()
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({path: '/login'})
        }
    }
});


//实例化Vue
new Vue({
    el: '#app',
    router,
    store,
    render: c => c(App)
})