import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
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
  it('flyttar fokus till det första ogiltiga fältet när valideringen misslyckas', async () => {
    const user = userEvent.setup()
    render(MoveFormView)

    await user.click(screen.getByRole('button', { name: 'Skicka flyttanmälan' }))

    expect(screen.getByLabelText('Ny adress')).toHaveFocus()
  })

  it('flyttar fokus till postnumret när bara det är fel', async () => {
    const user = userEvent.setup()
    render(MoveFormView)

    await user.type(screen.getByLabelText('Ny adress'), 'Solvägen 12')
    await user.type(screen.getByLabelText('Postnummer'), '802')
    await user.type(screen.getByLabelText('Ort'), 'Gävle')
    await user.type(screen.getByLabelText('Inflyttningsdatum (ÅÅÅÅ-MM-DD)'), '2099-01-01')
    await user.selectOptions(screen.getByLabelText('Avtal'), 'Rörligt pris')
    await user.click(screen.getByRole('button', { name: 'Skicka flyttanmälan' }))

    const zip = screen.getByLabelText('Postnummer')
    expect(zip).toHaveFocus()
    expect(zip).toHaveAccessibleDescription('Postnummer ska vara fem siffror')
  })

  it('kopplar felet till avtalslistan och flyttar fokus dit', async () => {
    const user = userEvent.setup()
    render(MoveFormView)

    await user.type(screen.getByLabelText('Ny adress'), 'Solvägen 12')
    await user.type(screen.getByLabelText('Postnummer'), '80267')
    await user.type(screen.getByLabelText('Ort'), 'Gävle')
    await user.type(screen.getByLabelText('Inflyttningsdatum (ÅÅÅÅ-MM-DD)'), '2099-01-01')
    await user.click(screen.getByRole('button', { name: 'Skicka flyttanmälan' }))

    const contract = screen.getByLabelText('Avtal')
    expect(contract).toHaveFocus()
    expect(contract).toBeInvalid()
    expect(contract).toHaveAccessibleDescription('Fältet får inte vara tomt')
  })

  it('har inga axe-överträdelser när felen visas', async () => {
    const user = userEvent.setup()
    const { container } = render(MoveFormView)
    await user.click(screen.getByRole('button', { name: 'Skicka flyttanmälan' }))
    expect(await axe(container)).toHaveNoViolations()
  })
})
