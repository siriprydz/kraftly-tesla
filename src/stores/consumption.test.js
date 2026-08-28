vi.mock('../services/api')

import { beforeEach, describe, it, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { fetchConsumption } from '../services/api'
import { useConsumptionStore } from './consumption'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
})

describe('Consumption store tests', () => {
  it('loads consumption data from API', async () => {
    const mockData = {
      unit: 'kWh',
      months: ['Jul', 'Aug'],
      values: [210, 195],
      pricePerKwh: 1.42,
    }
    fetchConsumption.mockResolvedValue(mockData)

    const store = useConsumptionStore()
    await store.load()

    expect(fetchConsumption).toHaveBeenCalledOnce()
    expect(store.data).toEqual(mockData)
    expect(store.loading).toBe(false)
  })
})
