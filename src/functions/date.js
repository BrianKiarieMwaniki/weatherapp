export const getTodaysDate = () => {
  // Create a new Date object
  var today = new Date();

  // Format options for the desired format
  return formatDate(today);
};

export const getFormattedDate = (inputDate) => {
  const newDate = getDateFromStr(inputDate);

  return formatDate(newDate);
};

export const getHourFromDateStr = (date) => {
  const time =  date.split(" ")[1];
  return time.split(":")[0];
};

export const isTodaysDate = (inputDate) => {
  const date = getDateFromStr(inputDate);
  if (date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
    return true;
  }

  return false;
};

const getDateFromStr = (dateStr) => {
  const [year, monthIndex, day] = dateStr.split("-").map(Number);

  const date = new Date(year, monthIndex - 1, day);

  return date;
};

const formatDate = (date) => {
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var dateFormatter = new Intl.DateTimeFormat("en-US", options);

  // Format the date to get the desired format
  var formattedDate = dateFormatter.format(date);

  return formattedDate;
};
