import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage/HomePage.vue';
import AboutPage from '../components/AboutPage/AboutPage.vue';
import CreatePage from '../components/CreatePage/CreatePage.vue';
import CardPage from '../components/CardPage/CardPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePage,
    props: true,
  },
  {
    path: '/card/:id',
    name: 'card',
    component: CardPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;