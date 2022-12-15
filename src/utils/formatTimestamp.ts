export const formatTimestamp = (x: Date = new Date()) => {
  const date = x.getDate(),
    month = x.getMonth(),
    year = x.getFullYear(),
    hours = x.getHours(),
    minutes = x.getMinutes(),
    seconds = x.getSeconds();

  return `${date}/${month}/${year}-${hours}:${minutes}:${seconds}`;
};
