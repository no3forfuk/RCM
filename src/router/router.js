
import Home from '../components/home/home.vue';
import Login from '../components/login/login.vue';
import Register from '../components/register/register.vue';
import index from '../components/index/index.vue';
import RankList from '../components/ranklist/ranklist.vue';
import PushTask from '../components/pushTask/pushTask.vue';
import ElementList from '../components/elementList/elementList.vue';
import PostList from '../components/postList/postList.vue';
import LevelCtrl from '../components/levelCtrl/levelCtrl.vue';
export const routes = [
    {
        path: '/home', name: 'home', component: Home,
        children: [
            { path: '/home/rankList', name: 'rankList', component: RankList },
            { path: '/home/pushTask', name: 'pushTask', component: PushTask },
            { path: '/home/elementList', name: 'elementList', component: ElementList },
            { path: '/home/postList', name: 'postList', component: PostList },
            { path: '/home/levelCtrl', name: 'levelCtrl', component: LevelCtrl },
        ],
        redirect:'/home/rankList'
    },
    {
        path: '/login', name: 'login', component: Login,
    },
    { path: '/register', name: 'register', component: Register },
    { path: '/index', name: 'index', component: index },
    { path: '/', redirect: 'login' }
];
export default {
    routes,
}
