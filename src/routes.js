import { createRouter, createWebHistory } from "vue-router";
import Home from "./shared/presentation/views/home.vue";
import cellaringRoutes from "./cellaring/presentation/cellaring-routes.js";

const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
    { path: '/home', name: 'home', component: Home, meta: { title: 'Home' } },
    ...cellaringRoutes,
    { path: '/', redirect: '/home' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page Not Found' } }
];

const routes = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});

routes.beforeEach((to, from, next) => {
    const baseTitle = 'Kessick Wine Storage Systems';
    document.title = `${baseTitle} | ${to.meta['title'] || 'App'}`;
    next();
});

export default routes;