import { it, expect } from 'vitest'
import { invoiceStatus } from './invoice'

it('should return the correct invoice status', () => {
  const result = invoiceStatus(
    { status: 'Obetald', due: '2026-07-31' },
    new Date('2026-08-27T15:30:00'),
  )
  expect(result).toBe('Förfallen')
})

it('should not mark an invoice overdue on its due date', () => {
  const result = invoiceStatus(
    { status: 'Obetald', due: '2026-08-27' },
    new Date('2026-08-27T15:30:00'),
  )
  expect(result).toBe('Obetald')
})

it('should preserve a paid invoice status', () => {
  const result = invoiceStatus(
    { status: 'Betald', due: '2026-07-31' },
    new Date('2026-08-27T15:30:00'),
  )
  expect(result).toBe('Betald')
})
