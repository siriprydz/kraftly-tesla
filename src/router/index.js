import { createRouter, createWebHistory } from 'vue-router'
import { getAccessToken } from '../services/token'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('../views/LoginView.vue') },
    { path: '/', component: () => import('../views/DashboardView.vue') },
    { path: '/fakturor', component: () => import('../views/InvoicesView.vue') },
    { path: '/flytt', component: () => import('../views/MoveFormView.vue') },
    { path: '/profil', component: () => import('../views/ProfileView.vue') },
  ],
})

// UX-guard: send logged out users to /login. The real guard is in the API layer (401 without valid token).
router.beforeEach((to) => {
  if (to.path !== '/login' && !getAccessToken()) {
    return '/login'
  }
})

export default router
