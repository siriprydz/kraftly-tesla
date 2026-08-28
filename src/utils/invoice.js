import { parseLocalDate, startOfDay } from './date'

export const invoiceStatus = (invoice, currentDate) => {
  if (invoice.status !== 'Obetald') {
    return invoice.status
  }

  const dueDay = startOfDay(parseLocalDate(invoice.due))
  const today = startOfDay(currentDate)

  return dueDay < today ? 'Förfallen' : 'Obetald'
}
