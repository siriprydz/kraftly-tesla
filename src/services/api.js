// API client for Kraftly "Mina sidor"
//
// Ingen nyckel här. Allt i frontendkoden hamnar i JavaScript-filen som browsern laddar
// ner – en nyckel här är publik för alla som trycker F12. Appen anropar /api relativt.
// Servern framför appen (Vite lokalt, nginx i containern) lägger på nyckeln.
const BASE_URL = ''

const request = async (path, options = {}) => {
  const res = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
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
