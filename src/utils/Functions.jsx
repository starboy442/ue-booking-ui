export const title = (text) => {
  if (text && isNaN(text)) {
    let title = [];
    const pattern = /^\s*$/;
    if (pattern.test(text)) {
      const text_arr = text.split(" ");
      for (let i = 0; i < text_arr.length; i++) {
        let capitalized =
          text_arr[0].charAt(0).toUpperCase() + text_arr[i].slice(1);
        title.push(capitalized);
      }
      return title.join(" ");
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
};

export const formatDate = (date) => {
  let formatDate = null;
  if (date) {
    formatDate = new Date(date);
  } else {
    formatDate = new Date();
  }
  const year = formatDate.getFullYear();
  const month = formatDate.getMonth() + 1;
  const day = formatDate.getDay();
  const hours = formatDate.getHours() % 12 || 12;
  const minutes = formatDate.getMinutes();
  // const seconds = formatDate.getSeconds();
  const period = formatDate.getHours() >= 12 ? "PM" : "AM";
  const formated_date = `${year}-${month}-${day} ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${period}`;
  return formated_date;
};

export const convertTimeString = (dateString, timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  let date = new Date(dateString);
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.toISOString();
};

export const calculateHourDifference = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);

  const diffMilliseconds = Math.abs(endTime - startTime);
  const diffHours = diffMilliseconds / (1000 * 60 * 60);

  return diffHours;
};

export const randomCoupon = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let coupon = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    coupon += characters.charAt(randomIndex);
  }
  return coupon;
};
