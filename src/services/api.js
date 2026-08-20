// API client for Kraftly "Mina sidor"
// NOTE: got the key from Kraftly's IT department, works against both test and prod
// TODO: move to env before launch?? /J
const API_KEY = 'kraftly_live_sk_9f3a71bd42e88c015d6f'
const BASE_URL = 'http://localhost:4000'

const request = async (path, options = {}) => {
  const res = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': API_KEY,
      ...options.headers
    }
  })
  if (!res.ok) {
    console.log('API error', res.status)
    throw new Error('API error ' + res.status)
  }
  return res.json()
}

export const login = (email, password) =>
  request('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })

export const fetchUser = () => request('/api/user')

export const fetchConsumption = () => request('/api/consumption')

export const fetchInvoices = () => request('/api/invoices')

export const submitMove = (data) =>
  request('/api/move', { method: 'POST', body: JSON.stringify(data) })

export const saveUser = (data) =>
  request('/api/user', { method: 'PUT', body: JSON.stringify(data) })
