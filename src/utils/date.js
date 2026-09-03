const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/ //regex for date format yyyy-mm-dd
export function parseLocalDate(dateStr) {
  const match = typeof dateStr === 'string' ? dateStr.match(DATE_PATTERN) : null
  if (!match) return null

  const [year, month, day] = match.slice(1).map(Number)
  const date = new Date(year, month - 1, day)

  const isReal =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
  return isReal ? date : null
}

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}
