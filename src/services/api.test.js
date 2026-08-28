import { afterEach, it, expect, vi } from 'vitest'
import { fetchInvoices } from './api'

afterEach(() => {
  vi.unstubAllGlobals()
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