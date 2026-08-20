import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchUser, saveUser } from '../services/api'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const loading = ref(false)

  const load = async () => {
    loading.value = true
    try {
      user.value = await fetchUser()
    } catch (e) {
      console.log(e)
    }
    loading.value = false
  }

  const save = async (data) => {
    user.value = await saveUser(data)
    alert('Sparat!')
  }

  return { user, loading, load, save }
})
