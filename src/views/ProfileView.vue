<template>
  <div>
    <h1>Mina uppgifter</h1>
    <div class="card" style="max-width:560px" v-if="store.user">
      <div class="field">
        <span class="field-label">Kundnummer</span>
        <span>{{ store.user.customerNo }}</span>
      </div>
      <input type="text" v-model="name">
      <input type="text" v-model="email">
      <input type="text" v-model="address">
      <AppButton color="#12b76a" @click="save">Spara ändringar</AppButton>
      <button class="button-secondary" style="margin-left:10px" @click="reset">Ångra</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppButton from '../components/AppButton.vue'
import { useUserStore } from '../stores/user'

const store = useUserStore()
const name = ref('')
const email = ref('')
const address = ref('')

const reset = () => {
  name.value = store.user.name
  email.value = store.user.email
  address.value = store.user.address
}

const save = () => {
  store.save({ name: name.value, email: email.value, address: address.value })
}

onMounted(async () => {
  if (!store.user) await store.load()
  reset()
})
</script>

<style scoped>
.field { display: flex; justify-content: space-between; padding: 8px 0 14px; font-size: 14px; }
.field-label { color: #7c8698; }
</style>
