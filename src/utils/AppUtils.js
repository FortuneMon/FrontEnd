import dayjs from "dayjs";

export function makeCalendarArray(year, month) {
  //1월: 0 ~ 12월: 11
  //일: 0 ~ 토: 6
  const firstDate = dayjs(new Date(year, month - 1, 1));
  const lastDate = dayjs(new Date(year, month, 0));
  const totalDays = lastDate.get("date");
  const dayOfFirstDate = firstDate.day();

  const totalWeeks = Math.ceil((dayOfFirstDate + totalDays) / 7);
  const result = Array(7 * totalWeeks).fill(null);

  for (let i = 0; i < totalDays; i++) {
    result[dayOfFirstDate + i] = firstDate.add(i, "day").format("YYYY-MM-DD");
  }

  return result;
}

export function getTotalDays(year, month) {
  const lastDate = dayjs(new Date(year, month, 0));
  return lastDate.get("date");
}

export function getRandomItems(array, count) {
  if (count === 0 || count > array.length) {
    return [];
  }
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
