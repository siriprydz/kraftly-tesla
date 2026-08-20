import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchConsumption } from '../services/api'

export const useConsumptionStore = defineStore('consumption', () => {
  const data = ref(null)
  const loading = ref(false)

  const load = async () => {
    loading.value = true
    data.value = await fetchConsumption()
    loading.value = false
  }

  return { data, loading, load }
})
