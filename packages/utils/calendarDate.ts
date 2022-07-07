// 获取当前日期所在月份的天数
export function getDaysOfOneMonth(date: string | Date): number {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const d = new Date(year, month, 0);
  return d.getDate();
}

// 获取当前日期所在月份的第一天是周几
export function getFirstWeekDayOfMonth(date: string | Date): number {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const firstDayOfMonth = new Date(`${year}/${month}/1`);
  return firstDayOfMonth.getDay();
}

function formatMonthOrDay(monthOrDay: number | string) {
  return Number(monthOrDay) >= 10 ? monthOrDay : `0${monthOrDay}`;
}

export function formatDate(date: string | Date, seperatorSign = '/') {
  // ios bug
  // https://blog.csdn.net/qq_34664239/article/details/93208733
  date = typeof date === 'string' ? new Date(date.replace(/-/g, '/')) : date;
  return `
    ${date.getFullYear()}
    ${seperatorSign}
    ${formatMonthOrDay(date.getMonth() + 1)}
    ${seperatorSign}
    ${formatMonthOrDay(date.getDate())}
  `.replace(/(\s+)/g, '').trim();
}

export function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function compareMonth(date1: Date, date2: Date) {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();

  if (year1 === year2) {
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    // eslint-disable-next-line no-nested-ternary
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}

export function compareDay(date1: Date, date2: Date) {
  const compareMonthRes = compareMonth(date1, date2);

  if (compareMonthRes === 0) {
    const day1 = date1.getDate();
    const day2 = date2.getDate();
    // eslint-disable-next-line no-nested-ternary
    return day1 === day2 ? 0 : day1 > day2 ? 1 : -1;
  }

  return compareMonthRes;
}

export function formatSigleNumber(num: number | string): string {
  return Number(num) < 10 ? `0${num}` : String(num);
}
