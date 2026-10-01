import { createRouter, createWebHistory } from 'vue-router'
// TODO: look into "lazy loading" at some point, ran out of time /M
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import InvoicesView from '../views/InvoicesView.vue'
import MoveFormView from '../views/MoveFormView.vue'
import ProfileView from '../views/ProfileView.vue'
import { getAccessToken } from '../services/token'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginView },
    { path: '/', component: DashboardView },
    { path: '/fakturor', component: InvoicesView },
    { path: '/flytt', component: MoveFormView },
    { path: '/profil', component: ProfileView },
  ],
})

// UX-guard: send logged out users to /login. The real guard is in the API layer (401 without valid token).
router.beforeEach((to) => {
  if (to.path !== '/login' && !getAccessToken()) {
    return '/login'
  }
})

export default router
