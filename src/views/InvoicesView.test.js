import { fireEvent, render, screen } from '@testing-library/vue'
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import InvoicesView from './InvoicesView.vue'
import { fetchInvoices } from '../services/api'

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
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('loads invoices and renders the heading and rows', async () => {
    render(InvoicesView)

    expect(fetchInvoices).toHaveBeenCalled()
    expect(await screen.findByRole('heading', { name: 'Fakturor' })).toBeInTheDocument()
    expect(await screen.findByText('F-2026-06')).toBeInTheDocument()
    expect(screen.getByText('Juni')).toBeInTheDocument()
    expect(screen.getByText('F-2026-07')).toBeInTheDocument()
    expect(screen.getByText('Juli')).toBeInTheDocument()
    expect(screen.getByText('F-2026-08')).toBeInTheDocument()
  })

  it('renders the correct invoice status text', async () => {
    render(InvoicesView)

    const paidStatus = await screen.findByText('Betald')
    const overdueStatus = await screen.findByText('Förfallen')
    const unpaidStatus = await screen.findByText('Obetald')

    expect(paidStatus).toBeInTheDocument()
    expect(overdueStatus).toBeInTheDocument()
    expect(unpaidStatus).toBeInTheDocument()
  })

  it('shows a warning alert when the user clicks download', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(InvoicesView)

    const downloadButton = await screen.findAllByText('Ladda ner')

    await fireEvent.click(downloadButton[0])

    expect(alertSpy).toHaveBeenCalledWith('Nedladdning kommer snart')
    alertSpy.mockRestore()
  })
})
