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