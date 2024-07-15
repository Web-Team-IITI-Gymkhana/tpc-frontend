import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export function getWeek(weekOffset: number): dayjs.Dayjs[] {
  const dates: dayjs.Dayjs[] = [];

  const today = dayjs();
  const dayOfWeek = today.day();
  let diff = today.date() - dayOfWeek + weekOffset * 7;
  const sunday = dayjs().date(diff);

  for (let i = 0; i < 7; i++) {
    const currentDate = dayjs(sunday).add(i, "day");
    dates.push(currentDate);
  }
  return dates;
}

export function getDate(dateOffset: number): dayjs.Dayjs {
  const today = dayjs();
  return today.add(dateOffset, "day");
}
