import { afterEach, it, expect, vi } from 'vitest'
import {
  login,
  fetchUser,
  fetchConsumption,
  fetchInvoices,
  submitMove,
  saveUser
} from './api'

afterEach(() => {
  vi.unstubAllGlobals()
})

it('logs in a user', async () => {
  const response = { token: 'test-token', name: 'Anna Andersson' }

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => response
    })
  )

  const result = await login('anna@example.com', 'secret')

  expect(result).toEqual(response)
  expect(fetch).toHaveBeenCalledWith(
    'http://localhost:4000/api/login',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ email: 'anna@example.com', password: 'secret' })
    })
  )
})

it('fetches the user', async () => {
  const user = { id: 1, name: 'Anna Andersson' }

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => user
    })
  )

  const result = await fetchUser()

  expect(result).toEqual(user)
})

it('fetches consumption', async () => {
  const consumption = { unit: 'kWh', values: [210, 195] }

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => consumption
    })
  )

  const result = await fetchConsumption()

  expect(result).toEqual(consumption)
})

it('fetches invoices', async () => {
  const invoices = [{ id: 'F-2026-06', status: 'Obetald' }]

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => invoices
    })
  )

  const result = await fetchInvoices()

  expect(result).toEqual(invoices)
})

it('throws an error when the API request fails', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    })
  )

  await expect(fetchInvoices()).rejects.toThrow('API error 500')
})

it('submits a move request', async () => {
  const moveData = { address: 'Solvägen 12', moveDate: '2026-09-01' }
  const response = { ok: true, ref: 'FLYTT-12345' }

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => response
    })
  )

  const result = await submitMove(moveData)

  expect(result).toEqual(response)
  expect(fetch).toHaveBeenCalledWith(
    'http://localhost:4000/api/move',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(moveData)
    })
  )
})

it('saves the user', async () => {
  const userData = { name: 'Anna Andersson' }
  const response = { id: 1, ...userData }

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => response
    })
  )

  const result = await saveUser(userData)

  expect(result).toEqual(response)
  expect(fetch).toHaveBeenCalledWith(
    'http://localhost:4000/api/user',
    expect.objectContaining({
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  )
})