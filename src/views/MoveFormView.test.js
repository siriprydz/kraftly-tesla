import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import MoveFormView from './MoveFormView.vue'

vi.mock('../services/api', () => ({
  submitMove: vi.fn().mockResolvedValue({ ok: true, ref: 'FLYTT-12345' }),
}))

const today = new Date('2026-08-31T12:00:00')

const isoDatePlusDays = (days) => {
  const date = new Date(today)
  date.setDate(date.getDate() + days)
  return date.toLocaleDateString('sv-SE')
}

describe('MoveFormView', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(today)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('has a field for new adress that a screen reader can read', () => {
    render(MoveFormView)
    expect(screen.getByLabelText('Ny adress')).toBeInTheDocument()
  })
  it('shows a confirmation message when the form is submitted', async () => {
    const user = userEvent.setup()
    render(MoveFormView)

    await user.type(screen.getByPlaceholderText('Ny adress'), 'Storgatan 1')
    await user.type(screen.getByPlaceholderText('Postnummer'), '12345')
    await user.type(screen.getByPlaceholderText('Ort'), 'Stockholm')
    await user.type(
      screen.getByPlaceholderText('Inflyttningsdatum (ÅÅÅÅ-MM-DD)'),
      isoDatePlusDays(20),
    )
    await user.selectOptions(screen.getByRole('combobox'), 'Rörligt pris')

    await user.click(screen.getByRole('button', { name: 'Skicka flyttanmälan' }))

    expect(await screen.findByText('Tack! Referensnummer: FLYTT-12345')).toBeInTheDocument()
  })
})
