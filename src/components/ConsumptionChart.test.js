import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Chart from 'chart.js/auto'
import ConsumptionChart from './ConsumptionChart.vue'

vi.mock('chart.js/auto', () => ({
  default: vi.fn(function Chart() {
    this.destroy = vi.fn()
  }),
}))

describe('ConsumptionChart tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the consumption chart', () => {
    render(ConsumptionChart, {
      props: {
        months: ['Jul', 'Aug'],
        values: [210, 195],
      },
    })

    expect(screen.getByRole('img', { name: 'Förbrukningsdiagram' })).toBeInTheDocument()
  })

  it('sends months and values to the chart', () => {
    render(ConsumptionChart, {
      props: { months: ['Jul', 'Aug'], values: [210, 195] },
    })

    expect(Chart).toHaveBeenCalledOnce()
    expect(Chart.mock.calls[0][1].data.labels).toEqual(['Jul', 'Aug'])
    expect(Chart.mock.calls[0][1].data.datasets[0].data).toEqual([210, 195])
  })
})
