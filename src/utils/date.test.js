import { describe, it, expect } from 'vitest'
import { parseLocalDate, startOfDay } from './date'

describe('parseLocalDate tests', () => {
  it('parses an ISO date string into a local date at midnight', () => {
    expect(parseLocalDate('2026-07-31')).toEqual(new Date(2026, 6, 31))
  })

  it('rejects a date that does not exist on the calendar', () => {
    expect(parseLocalDate('2026-02-30')).toBe(null)
  })

  it('rejects a month outside 1-12', () => {
    expect(parseLocalDate('2026-13-01')).toBe(null)
    expect(parseLocalDate('2026-00-10')).toBe(null)
  })

  it('rejects an empty string', () => {
    expect(parseLocalDate('')).toBe(null)
  })
  it('rejects a string taht is not a date', () => {
    expect(parseLocalDate('inte-ett-datum')).toBe(null)
  })

  it('rejects a missing date instead of throwing', () => {
    expect(parseLocalDate(undefined)).toBe(null)
  })
})

describe('startOfDay tests', () => {
  it('strips the time of day', () => {
    expect(startOfDay(new Date(2026, 7, 27, 15, 30, 45))).toEqual(new Date(2026, 7, 27))
  })
})
