import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const Home = () => import('@/views/Home.vue');
const About = () => import('@/views/About.vue');
const Manage = () => import('@/views/Manage.vue');
const Song = () => import('@/views/Song.vue');

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/about',
    component: About,
    name: 'About',
  },
  {
    path: '/manage',
    component: Manage,
    name: 'Manage',
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'Song',
    path: '/song/:id',
    component: Song,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { path: '/' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((route) => route.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.auth.userLoggedIn) {
    next();
    return;
  }
  next({ name: 'Home' });
});

export default router;
