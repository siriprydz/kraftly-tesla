<template>
  <div>
    <h1>Mina uppgifter</h1>
    <div v-if="store.user" class="card" style="max-width: 560px">
      <div class="field">
        <span class="field-label">Kundnummer</span>
        <span>{{ store.user.customerNo }}</span>
      </div>
      <label for="profile-name">Namn</label>
      <input id="profile-name" v-model="name" type="text" autocomplete="name" />
      <label for="profile-email">E-postadress</label>
      <input id="profile-email" v-model="email" type="email" autocomplete="email" />
      <label for="profile-address">Adress</label>
      <input id="profile-address" v-model="address" type="text" autocomplete="street-address" />
      <KButton color="#12b76a" @click="save">Spara ändringar</KButton>
      <KButton variant="secondary" style="margin-left: 10px" @click="reset">Ångra</KButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import KButton from '../components/KButton.vue'
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
label {
  display: block;
  font-size: 13px;
  color: #4a5468;
  margin-bottom: 4px;
}

.field {
  display: flex;
  justify-content: space-between;
  padding: 8px 0 14px;
  font-size: 14px;
}

.field-label {
  color: #7c8698;
}
</style>
