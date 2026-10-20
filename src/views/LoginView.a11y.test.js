import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { axe } from 'jest-axe'
import LoginView from './LoginView.vue'

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useRoute: () => ({ query: {} }),
}))

const renderLogin = () => render(LoginView)

describe('LoginView – tillgänglighet', () => {
  it('har inga axe-överträdelser', async () => {
    const { container } = renderLogin()
    expect(await axe(container)).toHaveNoViolations()
  })

  // axe godkänner en placeholder som namn – getByLabelText gör det inte
  it('fälten har labels som en skärmläsare hittar', () => {
    renderLogin()
    expect(screen.getByLabelText('E-postadress')).toBeInTheDocument()
    expect(screen.getByLabelText('Lösenord')).toBeInTheDocument()
  })
})
