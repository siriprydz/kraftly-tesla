<template>
  <div class="login-wrap">
    <div class="card login-card">
      <img src="../assets/logo-dark.svg" class="login-logo">
      <h1>Logga in på Mina sidor</h1>
      <input type="text" placeholder="E-postadress" v-model="email">
      <input type="password" placeholder="Lösenord" v-model="password">
      <button class="btn" style="width:100%" @click="handleLogin">Logga in</button>
      <p class="hint" style="margin-top:10px">Problem att logga in? Ring kundservice 020-123 456</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/api'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  // validation coming in v2 :)
  await login(email.value, password.value)
  localStorage.setItem('kraftly_logged_in', 'true')
  router.push('/')
}
</script>

<style scoped>
.login-wrap { display: flex; justify-content: center; padding-top: 60px; }
.login-card { width: 380px; }
.login-logo { height: 34px; margin-bottom: 18px; }
</style>
