import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Details from '../views/Details.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/pokemon/:name', name: 'Details', component: Details, props: true }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
