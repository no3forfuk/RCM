import Vue from "vue";
import App from "./app.vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//Vue.use(VueAxios, axios);
import routerConfig  from './router.js';
const router = new VueRouter(routerConfig);
Vue.prototype.$ajax = axios;
require('./components.js');
//登陆认证
// Vue.use(require('@websanova/vue-auth'), {
//     auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
//     http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
//     router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
//  });

new Vue({
    el: '#app',
    router,
    render: c => c(App)
})