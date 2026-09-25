// src/components/NorwayNotice.test.js
import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import NorwayNotice from './NorwayNotice.vue'

describe('NorwayNotice', () => {
  afterEach(() => {
    delete window.__KRAFTLY__
  })

  it('syns inte när flaggan är av', () => {
    window.__KRAFTLY__ = { env: 'production', features: { norway: false } }
    render(NorwayNotice)
    expect(screen.queryByTestId('norway-notice')).not.toBeInTheDocument()
  })

  it('syns när flaggan är på', () => {
    window.__KRAFTLY__ = { env: 'staging', features: { norway: true } }
    render(NorwayNotice)
    expect(screen.getByRole('heading', { name: /Norge/ })).toBeInTheDocument()
  })
})
