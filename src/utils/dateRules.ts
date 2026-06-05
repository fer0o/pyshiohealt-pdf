export const MIN_SESSION_DATE = "2000-01-01";

export function getTodayInputDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function clampSessionDate(date: string, maxDate = getTodayInputDate()) {
  if (!date) {
    return "";
  }

  if (date < MIN_SESSION_DATE) {
    return MIN_SESSION_DATE;
  }

  if (date > maxDate) {
    return maxDate;
  }

  return date;
}
