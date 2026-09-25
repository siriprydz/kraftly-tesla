// src/utils/features.test.js
import { afterEach, describe, expect, it } from 'vitest'
import { isEnabled } from './features'

describe('isEnabled', () => {
  afterEach(() => {
    delete window.__KRAFTLY__
  })

  it('är av när config saknas helt', () => {
    expect(isEnabled('norway')).toBe(false)
  })

  it('är av när flaggan inte finns med', () => {
    window.__KRAFTLY__ = { env: 'test', features: {} }
    expect(isEnabled('norway')).toBe(false)
  })

  it('är på bara när värdet är exakt true', () => {
    window.__KRAFTLY__ = { env: 'test', features: { norway: true } }
    expect(isEnabled('norway')).toBe(true)
    window.__KRAFTLY__ = { env: 'test', features: { norway: 'true' } }
    expect(isEnabled('norway')).toBe(false)
  })
})
