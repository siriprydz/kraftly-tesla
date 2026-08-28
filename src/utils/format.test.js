import { it, expect, describe } from 'vitest'
import { formatAmount } from './format'

describe('test formatAmount', () => {
    it('should return "-" if the amount is undefined', () => {
        const amount = undefined
        const result = formatAmount(amount)
        expect(result).toBe('-')
    });

    it('should return amount with thousand separators',() => {
        const amount = 1234567
        const result = formatAmount(amount)
        expect(result).toBe('1 234 567')

    })

    it ( 'should return amounts with thousands separated by spaces', () => {
    
        const amount = 1234
        const result = formatAmount(amount)
        expect(result).toBe('1 234')
    })

    it('should return amount with thousand separators',() => {
        const amount = 412
        const result = formatAmount(amount)
        expect(result).toBe('412')

    })

    it('should return amount with swedish , as decimal separator', () => {
        const amount = 1234.5
        const result = formatAmount(amount)
        expect(result).toBe('1 234,50')
    })
});