import { it, expect } from 'vitest'
import { invoiceStatus } from './invoice'

const today = new Date('2026-08-27T15:30:00') //set fake date for testing

describe('invoiceStatus tests', () => {
  it('should return the correct invoice status', () => {
    const result = invoiceStatus({ status: 'Obetald', due: '2026-07-31' }, today)
    expect(result).toBe('Förfallen')
  })

  it('should not mark an invoice overdue on its due date', () => {
    const result = invoiceStatus({ status: 'Obetald', due: '2026-08-27' }, today)
    expect(result).toBe('Obetald')
  })

  it('should preserve a paid invoice status', () => {
    const result = invoiceStatus({ status: 'Betald', due: '2026-07-31' }, today)
    expect(result).toBe('Betald')
  })

  it.each(['', 'inte-ett-datum', '2026-02-30', undefined])(
    'keeps staus as unpaid if due date is invalid',
    (due) => {
      const result = invoiceStatus(
        {
          status: 'Obetald',
          due,
        },
        today,
      )
      expect(result).toBe('Obetald')
    },
  )
})
