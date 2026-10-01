import { ref } from 'vue'
const accessToken = ref(null)
export const getAccessToken = () => accessToken.value
export const setAccessToken = (t) => {
  accessToken.value = t || null
}
