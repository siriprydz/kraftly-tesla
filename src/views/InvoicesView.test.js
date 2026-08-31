import { fireEvent, render, screen } from '@testing-library/vue'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import InvoicesView from './InvoicesView.vue'

const mockedInvoices = [
  {
    id: 'F-2026-06',
    period: 'Juni',
    amount: 1500,
    due: '2026-07-15',
    status: 'Betald'
  },
  {
    id: 'F-2026-07',
    period: 'Juli',
    amount: 2200,
    due: '2026-08-27',
    status: 'Obetald'
  },
  {
    id: 'F-2026-08',
    period: 'Augusti',
    amount: 2600,
    due: '2026-09-05',
    status: 'Obetald'
  }
]

vi.mock('../services/api', () => ({
  fetchInvoices: vi.fn(() => Promise.resolve(mockedInvoices))
}))

describe('InvoicesView', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-31T12:00:00'))
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the invoice heading and fetched rows', async () => {
    render(InvoicesView)

    expect(screen.getByRole('heading', { name: 'Fakturor' })).toBeInTheDocument()
    expect(await screen.findByText('F-2026-06')).toBeInTheDocument()
    expect(screen.getByText('Juni')).toBeInTheDocument()
    expect(screen.getByText('F-2026-07')).toBeInTheDocument()
    expect(screen.getByText('Juli')).toBeInTheDocument()
  })

  it('renders invoice status chips with the correct labels and classes', async () => {
    render(InvoicesView)

    const paidStatus = await screen.findByText('Betald')
    const overdueStatus = await screen.findByText('Förfallen')
    const unpaidStatus = await screen.findByText('Obetald')

    expect(paidStatus).toBeInTheDocument()
    expect(overdueStatus).toBeInTheDocument()
    expect(unpaidStatus).toBeInTheDocument()

    expect(paidStatus).toHaveClass('status-chip', 'status-betald')
    expect(overdueStatus).toHaveClass('status-chip', 'status-forfallen')
    expect(unpaidStatus).toHaveClass('status-chip', 'status-obetald')
  })

  it('shows download action and alerts when clicked', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(InvoicesView)

    const downloadButton = await screen.findAllByText('Ladda ner')

    await fireEvent.click(downloadButton[0])

    expect(alertSpy).toHaveBeenCalledWith('Nedladdning kommer snart')
  })
})
