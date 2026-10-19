import StatusChip from './StatusChip.vue'

export default {
  title: 'Komponenter/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
}

export const Betald = {
  args: { invoice: { id: 'F-2026-06', status: 'Betald', due: '2026-06-30' } },
}

export const Obetald = {
  args: { invoice: { id: 'F-2026-09', status: 'Obetald', due: '2999-12-31' } },
}

export const Forfallen = {
  args: { invoice: { id: 'F-2026-03', status: 'Obetald', due: '2026-03-31' } },
}
