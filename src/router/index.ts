import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router, routes };
