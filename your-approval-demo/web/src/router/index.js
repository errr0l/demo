import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login'),
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
    },
    {
        path: '/',
        component: () => import('@/views/home'),
    },
    {
        path: "/oauth2/callback",
        component: () => import("@/views/callback"),
    },
    {
        path: "/register",
        component: () => import("@/views/register"),
    },
    { path: '*', redirect: '/404' }
];

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
