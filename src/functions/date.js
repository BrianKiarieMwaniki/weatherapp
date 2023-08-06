export const getTodaysDate = () => {
  // Create a new Date object
  var today = new Date();

  // Format options for the desired format
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  // Create a date formatter with the specified options
  var dateFormatter = new Intl.DateTimeFormat("en-US", options);

  // Format the date to get the desired format
  var formattedDate = dateFormatter.format(today);

  return formattedDate;
}