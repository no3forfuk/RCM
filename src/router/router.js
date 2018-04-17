
import Home from '../components/home/home.vue';
import Login from '../components/login/login.vue';
import Register from '../components/register/register.vue';
import index from '../components/index/index.vue';
import RankList from '../components/ranklist/ranklist.vue';
export const routes = [
    {
        path: '/home', name: 'home', component: Home
    },
    {
        path: '/login', name: 'login', component: Login,
    },
    { path: '/register', name: 'register', component: Register },
    { path: '/index', name: 'index', component: index },
    { path: '/rankList', name: 'rankList', component: RankList },
    { path: '/', redirect: 'login' }
];
export default {
    routes,
}
