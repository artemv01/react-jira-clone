export const getDateString = (rawDate: Date) => {
  const padWithZero = (rawNumber: number | string): string => {
    return rawNumber < 10 ? `0${rawNumber}` : `${rawNumber}`;
  };

  const day = rawDate.getDate();
  const year = rawDate.getFullYear();
  const hour = rawDate.getHours();
  const minute = rawDate.getMinutes();
  const second = rawDate.getSeconds();
  const month = rawDate.toLocaleString('default', { month: 'short' });

  return `${month} ${padWithZero(day)}, ${year}, ${padWithZero(hour)}:${padWithZero(minute)}:${padWithZero(second)}`;
};