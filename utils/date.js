const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const getdate = date.getDate();
  let hour = date.getHours();
  const minutes =
    date.getMinutes().toString().length > 1
      ? date.getMinutes()
      : "0" + date.getMinutes();
  const AmorPm = hour >= 12 ? "PM" : "AM";
  hour = hour > 12 ? hour - 12 : hour;
  return `${months[month]} ${getdate} ${year}, ${hour}:${minutes} ${AmorPm}`;
}
//9988
export function getFormattedTime(sec) {
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  minutes = minutes.toString().length > 1 ? minutes : "0" + minutes;
  return `${hours}:${minutes}`;
}
