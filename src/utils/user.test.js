import { describe, it, expect } from 'vitest'
import { firstName } from './user'

describe('firstName', () => {
  it('returns first name from full name', () => {
    const user = 'Anna Andersson'
    const result = firstName(user)
    expect(result).toBe('Anna')
  })
  it('handles middle names', () => {
    const user = 'Anna Maria Andersson'
    const result = firstName(user)
    expect(result).toBe('Anna')
  })
  it('handles single name', () => {
    const user = 'Anna'
    const result = firstName(user)
    expect(result).toBe('Anna')
  })
  it('handles extra whitespace', () => {
    const user = '  Anna   Andersson  '
    const result = firstName(user)
    expect(result).toBe('Anna')
  })


  it('returns the first name when the saved name has a leading space', () => {
    const user = ' Anna Andersson'
    const result = firstName(user)
    expect(result).toBe('Anna')
  })
  it('handles hyphenated names', () => {
    const user = 'Anna-Marie Andersson'
    const result = firstName(user)
    expect(result).toBe('Anna-Marie')
  })
})
