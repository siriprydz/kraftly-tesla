const REQUIRED_FIELDS = ["address", "zip", "city", "date", "contract"];
const ZIP_PATTERN = /^\d{5}$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const MIN_DAYS_NOTICE = 14;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseLocalDate(dateString) {
  const match = dateString.match(DATE_PATTERN);
  if (!match) return null;

  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);

  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isValid ? date : null;
}

function toDayNumber(date) {
  return (
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY
  );
}

export function validateMove(form, today) {
  const errors = {};

  for (const field of REQUIRED_FIELDS) {
    if (!form[field]?.trim()) {
      errors[field] = "Fältet får inte vara tomt";
    }
  }

  if (!errors.zip && !ZIP_PATTERN.test(form.zip)) {
    errors.zip = "Postnummer ska vara fem siffror";
  }

  if (!errors.date) {
    const moveDate = parseLocalDate(form.date);
    if (!moveDate) {
      errors.date = "Datum måste vara i formatet ÅÅÅÅ-MM-DD";
    } else if (toDayNumber(moveDate) - toDayNumber(today) < MIN_DAYS_NOTICE) {
      errors.date = "Anmälan måste göras senast 14 dagar före flytt";
    }
  }

  return errors;
}
