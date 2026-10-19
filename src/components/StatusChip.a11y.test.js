import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'jest-axe'
import StatusChip from './StatusChip.vue'

describe('StatusChip – tillgänglighet', () => {
  it('har inga axe-överträdelser', async () => {
    const { container } = render(StatusChip, {
      props: { invoice: { status: 'Betald', due: '2026-06-30' } },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
