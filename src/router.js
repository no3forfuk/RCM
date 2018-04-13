
import Home from './component/home.vue';
import Login from './component/login.vue';
import Register from './component/register.vue';

module.exports = {
    routes: [
        { path: '/', name: 'home', component: Home ,meta: {
            auth: false
        }},
        { path: '/login', name: 'login', component: Login , meta: {
            auth: false
        }},
        { path: '/register', name: 'register', component: Register }
    ]
}
