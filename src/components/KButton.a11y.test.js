import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import KButton from './KButton.vue'

const renderButton = (props = {}, attrs = {}) =>
  render(KButton, { props, attrs, slots: { default: 'Spara ändringar' } })

describe('KButton', () => {
  it('är en riktig knapp med texten som namn', () => {
    renderButton()
    expect(screen.getByRole('button', { name: 'Spara ändringar' })).toHaveAttribute(
      'type',
      'button',
    )
  })

  it('går att trycka med tangentbordet (Enter och mellanslag)', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderButton({}, { onClick })
    await user.tab()
    expect(screen.getByRole('button')).toHaveFocus()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it.each(['primary', 'secondary', 'text'])('har inga axe-överträdelser (%s)', async (variant) => {
    const { container } = renderButton({ variant })
    expect(await axe(container)).toHaveNoViolations()
  })
})
