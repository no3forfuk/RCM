import Vue from "vue";
import App from "./app.vue";

//引入工具函数
import utils from './utils/utils';
//解析excl


//自定义组件引入
require('./components/components.js');
//vuex
import Vuex from 'vuex';

Vue.use(Vuex);
const storeConfig = require('./store/store');
const store = new Vuex.Store(storeConfig);
import {mapState} from 'vuex';


//router
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import routerConfig from './router/router.js';

const router = new VueRouter(routerConfig);
//权限控制

// router.beforeEach((to, from, next) => {
//     if (from.path === "/" || from.path === "/login") {
//         if (store.state.token) {
//             next()
//         } else {
//             if (to.path === "/login") {
//                 next()
//             } else {
//                 next('/login')
//             }
//
//         }
//     } else {
//         next(false)
//     }
//
//
// });


//实例化Vue
new Vue({
    el: '#app',
    router,
    store,
    render: c => c(App)
})