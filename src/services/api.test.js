import { afterEach, it, expect, vi } from 'vitest'
import {
  login,
  refreshAccessToken,
  fetchUser,
  fetchConsumption,
  fetchInvoices,
  submitMove,
  saveUser,
} from './api'
import { getAccessToken, setAccessToken } from './token'

afterEach(() => {
  vi.unstubAllGlobals()
  setAccessToken(null)
})

it('logs in a user', async () => {
  const response = { accessToken: 'test-token', name: 'Anna Andersson' }

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    }),
  )

  const result = await login('anna@example.com', 'secret')

  expect(result).toEqual(response)
  expect(fetch).toHaveBeenCalledWith(
    '/api/v2/auth/login',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ email: 'anna@example.com', password: 'secret' }),
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
      }),
    }),
  )
})

it('restores the access token using the refresh endpoint', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ accessToken: 'refreshed-token' }),
    }),
  )

  const refreshed = await refreshAccessToken()

  expect(refreshed).toBe(true)
  expect(getAccessToken()).toBe('refreshed-token')
  expect(fetch).toHaveBeenCalledWith(
    '/api/v2/auth/refresh',
    expect.objectContaining({ method: 'POST' }),
  )
})

it('refreshes and retries a request after 401', async () => {
  const invoices = [{ id: 'F-1' }]
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce({ ok: false, status: 401 })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ accessToken: 'new-token' }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => invoices,
    })

  vi.stubGlobal('fetch', fetchMock)

  await expect(fetchInvoices()).resolves.toEqual(invoices)

  expect(fetchMock).toHaveBeenCalledTimes(3)
  expect(fetchMock.mock.calls[1][0]).toBe('/api/v2/auth/refresh')
  expect(fetchMock.mock.calls[2][0]).toBe(fetchMock.mock.calls[0][0])
  expect(getAccessToken()).toBe('new-token')
})

it('does not retry more than once after 401', async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce({ ok: false, status: 401 })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ accessToken: 'new-token' }),
    })
    .mockResolvedValueOnce({ ok: false, status: 401 })

  vi.stubGlobal('fetch', fetchMock)

  await expect(fetchInvoices()).rejects.toThrow('API error 401')
  expect(fetchMock).toHaveBeenCalledTimes(3)
})

it('fetches the user', async () => {
  const user = { id: 1, name: 'Anna Andersson' }

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => user,
    }),
  )

  const result = await fetchUser()

  expect(result).toEqual(user)
  expect(fetch).toHaveBeenCalledWith('/api/user', expect.any(Object))
})

it('fetches consumption', async () => {
  const consumption = { unit: 'kWh', values: [210, 195] }

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => consumption,
    }),
  )

  const result = await fetchConsumption()

  expect(result).toEqual(consumption)
  expect(fetch).toHaveBeenCalledWith('/api/consumption', expect.any(Object))
})

it('fetches invoices', async () => {
  const invoices = [{ id: 'F-2026-06', status: 'Obetald' }]

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => invoices,
    }),
  )

  const result = await fetchInvoices()

  expect(result).toEqual(invoices)
  expect(fetch).toHaveBeenCalledWith('/api/invoices', expect.any(Object))
})

it('throws an error when the API request fails', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }),
  )

  await expect(fetchInvoices()).rejects.toThrow('API error 500')
})

it('submits a move request', async () => {
  const moveData = {
    address: 'Solvägen 12',
    zip: '802 67',
    city: 'Gävle',
    date: '2026-09-01',
    contract: 'Rörligt pris',
  }
  const response = { ok: true, ref: 'FLYTT-12345' }

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    }),
  )

  const result = await submitMove(moveData)

  expect(result).toEqual(response)
  expect(fetch).toHaveBeenCalledWith(
    '/api/move',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(moveData),
    }),
  )
})

it('saves the user', async () => {
  const userData = {
    name: 'Anna Andersson',
    email: 'anna.andersson@example.com',
    address: 'Solvägen 12',
  }
  const response = { id: 1, ...userData }

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    }),
  )

  const result = await saveUser(userData)

  expect(result).toEqual(response)
  expect(fetch).toHaveBeenCalledWith(
    '/api/user',
    expect.objectContaining({
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
  )
})
