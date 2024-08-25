import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Main.vue';
import About from '@/views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
