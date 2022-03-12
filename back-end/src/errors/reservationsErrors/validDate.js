const dayjs = require("dayjs");
let utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

//function to make sure the date being requested is valid
function hasValidDate(req, res, next) {
  const date = req.body.data.reservation_date;

  if (date) {
    if (!notAPreviousDate(date)) {
      return next({
        status: 400,
        message: `${date} needs to be a future date.`,
      });
    }
    if (!notATuesday(date)) {
      return next({
        status: 400,
        message: `${date} closed on tuesday.`,
      });
    }
    if (!dateIsADate(date)) {
      return next({
        status: 400,
        message: `${date} is not a reservation_date`,
      });
    }
    next();
  }
}

// makes sure date is not before today
function notAPreviousDate(date) {
  const todayDate = dayjs()
    .utc()
    .local()
    .format("YYYYMMDD")
    .toString()
    .split(":")
    .join("");
  const importedDate = date.toString().split("-").join("");
  if (importedDate >= todayDate) {
    return true;
  }
}

// makes sure date is not a Tuesday
function notATuesday(date) {
  const importedDate = new Date(`${date}T10:30:00`);
  const dateAsString = importedDate.toString();
  if (dateAsString.split(" ")[0] !== "Tue") {
    return true;
  }
}

// makes sure date is not invalid
function dateIsADate(date) {
  const importedDate = new Date(date);
  if (importedDate.toString() !== "Invalid Date") {
    return true;
  }
}

module.exports = hasValidDate;