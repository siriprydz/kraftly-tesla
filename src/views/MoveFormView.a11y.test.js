import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import MoveFormView from './MoveFormView.vue'

// Komponenttestet ska inte prata med API:t – vi mockar modulen.
vi.mock('../services/api', () => ({
  submitMove: vi.fn().mockResolvedValue({ ok: true, ref: 'FLYTT-12345' }),
}))

describe('MoveFormView – tillgänglighet', () => {
  it('kopplar felet till fältet – skärmläsaren hör det när fältet får fokus', async () => {
    const user = userEvent.setup()
    render(MoveFormView)

    // Ett felaktigt postnummer och en riktig ort – resten lämnas tomt
    await user.type(screen.getByLabelText('Postnummer'), '802')
    await user.type(screen.getByLabelText('Ort'), 'Gävle')
    await user.click(screen.getByRole('button', { name: 'Skicka flyttanmälan' }))

    const zip = screen.getByLabelText('Postnummer')
    expect(zip).toBeInvalid()
    expect(zip).toHaveAccessibleDescription('Postnummer ska vara fem siffror')
    expect(screen.getByLabelText('Ort')).not.toBeInvalid()
  })
})
