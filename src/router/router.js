// import Home from '../components/home/home.vue';
import Login from '../components/login/login.vue';
import Register from '../components/register/register.vue';
import index from '../components/index/index.vue';
import Html404 from '../components/common/404/404.vue';
// import RankList from '../components/ranklist/ranklist.vue';
// import PushTask from '../components/pushTask/pushTask.vue';
// import ElementList from '../components/elementList/elementList.vue';
// import PostList from '../components/postList/postList.vue';
// import LevelCtrl from '../components/levelCtrl/levelCtrl.vue';
// import UpLoadRank from '../components/uploadRank/upload.vue';

export const routes = [
    { path: '/', redirect: '/login', hidden: true },
    {
        path: '/home', name: 'home', component: resolve => require(['../components/home/home.vue'], resolve)
        ,
        children: [
            // {
            //     path: '/home/rankList/',
            //     name: 'rankList',
            //     component: resolve => require(['../components/common/404/404.vue'], resolve)
            // },
            {
                path: '/home/rankList',
                name: 'ranking',
                component: resolve => require(['../components/ranklist/ranklist.vue'], resolve)
            },
            {
                path: '/home/pushTask',
                name: 'push',
                component: resolve => require(['../components/pushTask/pushTask.vue'], resolve)
            },
            {
                path: '/home/elementList',
                name: 'role',
                component: resolve => require(['../components/elementList/elementList.vue'], resolve)
            },
            {
                path: '/home/postList',
                name: 'postList',
                component: resolve => require(['../components/postList/postList.vue'], resolve)
            },
            {
                path: '/home/levelCtrl',
                name: 'levelCtrl',
                component: resolve => require(['../components/levelCtrl/levelCtrl.vue'], resolve)
            },
            {
                path: '/home/rankList/upload',
                name: 'upload',
                component: resolve => require(['../components/uploadRank/upload.vue'], resolve)
            },
        ],
        redirect: '/home/rankList'
    },
    {
        path: '/login', name: 'login', component: Login,
    },
    { path: '/register', name: 'register', component: Register },
    { path: '*', redirect: '/404', component: Html404 },

];

export default {
    routes,
    //mode: 'history'
}
