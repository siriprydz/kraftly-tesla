<template>
  <div class="login-wrap">
    <div class="card login-card">
      <img src="../assets/logo-dark.svg" class="login-logo" alt="Kraftly" />
      <h1>Logga in på Mina sidor</h1>
      <KField v-model="email" label="E-postadress" type="email" autocomplete="username" />
      <KField v-model="password" label="Lösenord" type="password" autocomplete="current-password" />
      <KButton
        type="submit"
        block
        :disabled="busy"
        variant="primary"
        style="width: 100%"
        @click="handleLogin"
      >
        Logga in
      </KButton>
      <p class="hint" style="margin-top: 10px">
        Problem att logga in? Ring kundservice 020-123 456
      </p>
      <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/api'
import { setAccessToken } from '../services/token'
import KButton from '../components/KButton.vue'
import KField from '../components/KField.vue'

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  try {
    const result = await login(email.value, password.value)
    setAccessToken(result.accessToken)
    await router.push('/')
  } catch {
    errorMessage.value = 'Inloggningen misslyckades. Kontrollera uppgifterna.'
  }
}
</script>

<style scoped>
label {
  display: block;
  font-size: 13px;
  color: #4a5468;
  margin-bottom: 4px;
}

.login-wrap {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}

.login-card {
  width: 380px;
}

.login-logo {
  height: 34px;
  margin-bottom: 18px;
}
</style>
