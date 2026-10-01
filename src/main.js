import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { refreshAccessToken } from './services/api'
import './assets/styles.css'

const startApp = async () => {
  await refreshAccessToken()

  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  await router.isReady()
  app.mount('#app')
}

startApp()
