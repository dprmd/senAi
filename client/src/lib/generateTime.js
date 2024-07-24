export const generateTimeNow = (timeInMs) => {
  let date;
  if (timeInMs) {
    date = new Date(timeInMs);
  } else {
    date = new Date();
  }
  const pad = (val) => (val < 10 ? "0" + val : val);
  const day = pad(date.getDate());
  const dayName = date.toLocaleString("default", { weekday: "long" });
  const month = pad(date.getMonth() + 1);
  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  const timeInSecond = date.getTime();
  return {
    day,
    dayName,
    month,
    monthName,
    year,
    hour,
    minute,
    second,
    timeInSecond,
  };
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getAge = (monthName, day, year, hour, minute, second) => {
  const pad = (val) => (val < 10 ? "0" + val : val);
  const today = new Date();
  const birthDate = new Date(
    `${monthName} ${pad(day)}, ${year} ${pad(hour)}:${pad(minute)}:${pad(second)}`,
  );
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
