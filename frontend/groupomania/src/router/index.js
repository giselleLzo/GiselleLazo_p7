import { createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import Posts from '@/components/Posts.vue';
import ProfileDelete from '@/components/ProfileDelete.vue';
import store from '../store/index'

const routes = [
    {
        name: 'login',
        path: '/',
        component: Login,
        meta: {
            title: 'Connexion',
            requiresUser: true,
        },
    }, {
        name: 'home',
        path: '/home',
        component: Home,
        meta: {
            title: 'Bienvenue',
            requiresAuth: true,
        },
    }, {
        name: 'profile',
        path: '/profile',
        component: Profile,
        props: true,
        meta: {
            title: 'Profile',
            requiresAuth: true,
        },
    }, {
        name: 'posts',
        path: '/posts/:id',
        component: Posts,
        props: true,
        meta: {
            title: 'Post',
            requiresAuth: true,
        },
    }, {
        name: 'profileDelete',
        path: '/profileDelete',
        component: ProfileDelete,
        props: true,
    }, 
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((routes) => routes.meta.requiresAuth)) {
        if (!store.state.user.token) {
            next({
                name: 'login'
            });
        }else {
            next();
        }
    }else if (to.matched.some((routes) => routes.meta.requiresUser)) {
        if ((store.state.user.token)) {
            next({
                name: 'home' || 'posts' || 'profile',
            });
        }else {
            next();
        }
    }else {
        next();
    }
});

router.afterEach((to, from) => {
    console.log(from, to);
    document.title = to.meta.title;
})

export default router;