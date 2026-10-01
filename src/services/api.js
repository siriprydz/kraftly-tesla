// API client for Kraftly "Mina sidor"
//
// Ingen nyckel här. Allt i frontendkoden hamnar i JavaScript-filen som browsern laddar
// ner – en nyckel här är publik för alla som trycker F12. Appen anropar /api relativt.
// Servern framför appen (Vite lokalt, nginx i containern) lägger på nyckeln.
import { getAccessToken, setAccessToken } from './token'

const BASE_URL = ''

const request = async (path, options = {}, retryOn401 = true) => {
  const token = getAccessToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }
  const res = await fetch(BASE_URL + path, {
    ...options,
    headers,
  })
  if (res.status === 401 && retryOn401) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      return request(path, options, false)
    }
  }
  if (!res.ok) {
    throw new Error('API error ' + res.status)
  }
  return res.json()
}

export const login = (email, password) =>
  request(
    '/api/v2/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
    false,
  )

export const refreshAccessToken = async () => {
  try {
    const result = await request('/api/v2/auth/refresh', { method: 'POST' }, false)
    setAccessToken(result.accessToken)
    return true
  } catch {
    setAccessToken(null)
    return false
  }
}

export const fetchUser = () => request('/api/v2/user')

export const fetchConsumption = () => request('/api/v2/consumption')

export const fetchInvoices = () => request('/api/v2/invoices')

export const submitMove = (data) =>
  request('/api/v2/move', { method: 'POST', body: JSON.stringify(data) })

export const saveUser = (data) =>
  request('/api/v2/user', { method: 'PUT', body: JSON.stringify(data) })
