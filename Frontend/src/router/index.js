import { createRouter, createWebHistory } from 'vue-router'
import AuthService from '../services/auth.service';
import HomeView from '../views/Home.vue'
import GameDiscussion from '../views/Game.vue'
import AdvancedSearch from '../views/AdvancedSearch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginRegisterView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile/@me',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path:'/discussion/:id/:idDiscussion',
      name: 'discussion',
      component: GameDiscussion
    },
    {
      path:'/advanced-search/:title',
      name: 'advancedSearch',
      component: AdvancedSearch
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    }
  ]
})

router.beforeEach((to) => {
  if (to.name != 'login' && !AuthService.isLogged()) {
    return { name: 'login' };
  } else if (AuthService.isLogged() && to.name === 'login') {
    return { name: 'home' };
  }
});

export default router
