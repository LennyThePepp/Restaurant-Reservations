const dayjs = require("dayjs");
let utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

// makes sure time being requested is valid
function hasValidTime(req, res, next) {
  const time = req.body.data.reservation_time;
  const date = req.body.data.reservation_date;
  if (time) {
    if (!isNotATime(time)) {
      return next({
        status: 400,
        message: `${time} is not a reservation_time.`,
      });
    }
    if (!withinOperatingHours(time)) {
      return next({
        status: 400,
        message: `${time} is not available.  Reservations must be made during business hours. `,
      });
    }
    if (!notBeforeCurrentTime(time, date)) {
      return next({
        status: 400,
        message: `${time} is not available.  Reservations must be made after current time.`,
      });
    }
    next();
  }
}

// makes sure time is within business hours
function withinOperatingHours(time) {
  const importedTime = Number(time.toString().split(":").slice(0, 2).join(""));
  if (Number(importedTime) > 1029 && Number(importedTime) < 2131) {
    return true;
  }
}

// makes sure time is after current time
function notBeforeCurrentTime(time, date) {
  const todayDate = dayjs()
    .utc()
    .local()
    .format("YYYYMMDD")
    .toString()
    .split(":")
    .join("");

  const importedDate = date.toString().split("-").join("");

  const currTime = dayjs()
    .utc()
    .local()
    .format("HH:mm")
    .toString()
    .split(":")
    .join("");

  const importedTime = Number(time.toString().split(":").slice(0, 2).join(""));

  if (importedDate === todayDate) {
    if (Number(importedTime) > Number(currTime)) {
      return true;
    }
  } else if (importedDate > todayDate) {
    return true;
  }
}

// determines that the time entered is valid
function isNotATime(time) {
  const importedTime = new Date(`2000-01-01T${time}`);
  if (importedTime.toString() !== "Invalid Date") {
    return true;
  }
}

module.exports = hasValidTime;