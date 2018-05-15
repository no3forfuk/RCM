// import Home from '../components/home/home.vue';
import Login from '../components/login/login.vue';
import Register from '../components/register/register.vue';
import index from '../components/index/index.vue';
import Html404 from '../components/common/404/404.vue';
// import RankList from '../components/ranklist/ranklist.vue';
// import PushTask from '../components/pushTask/pushList.vue';
// import ElementList from '../components/element/element.vue';
// import PostList from '../components/post/post.vue';
// import LevelCtrl from '../components/levelCtrl/levelCtrl.vue';
// import UpLoadRank from '../components/uploadRank/upload.vue';

export const routes = [
    {path: '/', redirect: '/login', hidden: true},
    {
        path: '/home', name: 'home', component: resolve => require(['../components/home/home.vue'], resolve)
        ,
        children: [
            // {
            //     path: '/home/rankList',
            //     name: 'ranking',
            //     component: resolve => require(['../components/ranklist/ranklist.vue'], resolve)
            // },
            {
                path: '/home/PushList',
                name: 'PushList',
                component: resolve => require(['../components/pushTask/pushList.vue'], resolve)
            },
            {
                path: '/home/FirstList',
                name: 'FirstList',
                component: resolve => require(['../components/firstRank/firstRankList.vue'], resolve)
            },
            {
                path: '/home/SecondList',
                name: 'SecondList',
                component: resolve => require(['../components/secondRank/SecondList.vue'], resolve)
            },
            {
                path: '/home/RoleList',
                name: 'RoleList',
                component: resolve => require(['../components/role/RoleList.vue'], resolve)
            },
            {
                path: '/home/ElementList',
                name: 'ElementList',
                component: resolve => require(['../components/element/list.vue'], resolve)
            },
            {
                path: '/home/ElementList/edit/:content',
                name: 'editElement',
                component: resolve => require(['../components/element/edit.vue'], resolve)
            },
            {
                path: '/home/upload',
                name: 'upload',
                component: resolve => require(['../components/uploadRank/upload.vue'], resolve)
            },
            {
                path: '/home/PushTask',
                name: 'PushTask',
                component: resolve => require(['../components/pushTask/pushTask.vue'], resolve)
            },
            {
                path: '/home/elementDetalis',
                name: 'elementDetails',
                query: {
                    id: 'id'
                },
                component: resolve => require(['../components/element/details.vue'], resolve)
            },
            {
                path: '/home/post',
                name: 'postList',
                component: resolve => require(['../components/post/list.vue'], resolve)
            },
            {
                path: '/home/addPost',
                name: 'addPost',
                component: resolve => require(['../components/post/add.vue'], resolve)
            },
            {
                path: '/home/postDetails',
                name: 'postDetails',
                component: resolve => require(['../components/post/details.vue'], resolve)
            }
        ],
        redirect: '/home/FirstList'
    },
    {
        path: '/login', name: 'login', component: Login,
    },
    {path: '/register', name: 'register', component: Register},
    {path: '*', redirect: '/404', component: Html404},

];

export default {
    routes,
    // mode: 'history'
}
