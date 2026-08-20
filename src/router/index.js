import { createRouter, createWebHistory } from 'vue-router'
// TODO: look into "lazy loading" at some point, ran out of time /M
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import InvoicesView from '../views/InvoicesView.vue'
import MoveFormView from '../views/MoveFormView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginView },
    { path: '/', component: DashboardView },
    { path: '/fakturor', component: InvoicesView },
    { path: '/flytt', component: MoveFormView },
    { path: '/profil', component: ProfileView }
  ]
})

// "auth" -- keeps unauthorized users out :)
router.beforeEach((to) => {
  if (to.path !== '/login' && localStorage.getItem('kraftly_logged_in') !== 'true') {
    return '/login'
  }
})

export default router
