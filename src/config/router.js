import { createRouter, createWebHistory  } from 'vue-router';
import gameComp from '../components/template/gameComp'
import mainMenu from '../components/template/mainMenu'

const routes = [
  {
    name: 'homeScreen',
    path: '/',
    component: mainMenu
  },
  {
    name: 'gameScreen',
    path: '/game',
    component: gameComp
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
