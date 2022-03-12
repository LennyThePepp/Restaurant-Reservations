const service = require("./reservations.service");


const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const validateProperties = require("../errors/reservationsErrors/validateProperties");
const hasProperties = require("../errors/reservationsErrors/hasProperties");
const hasValidDate = require("../errors/reservationsErrors/validDate");
const hasValidTime = require("../errors/reservationsErrors/validTime");
const reservationExists = require("../errors/reservationsErrors/reservationExists");
const peopleInteger = require("../errors/reservationsErrors/peopleInteger");
const statusUnknown = require("../errors/reservationsErrors/statusUnknown");
const statusIsFinished = require("../errors/reservationsErrors/statusIsFinished");
const statusReport = require("../errors/reservationsErrors/statusReport");


const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);


async function list(req, res) {
  if (req.query.mobile_number) {
    return res.json({
      data: await service.readPhoneNumber(req.query.mobile_number),
    });
  }
  if (req.query.date) {
    return res.json({ data: await service.list(req.query.date) });
  }
}


async function read(req, res, next) {
  const { reservation: data } = res.locals;
  res.status(200).json({ data });
}


async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}


async function updateStatus(req, res, next) {
  const resId = req.params.reservationId;
  const status = req.body.data.status;
  const data = await service.updateStatus(resId, status);
  res.status(200).json({ data });
}


async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const updatedReservation = {
    ...req.body.data,
    reservation_id,
  };
  const data = await service.update(updatedReservation);
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    validateProperties, 
    hasRequiredProperties, 
    peopleInteger, 
    hasValidDate, 
    hasValidTime, 
    statusReport, 
    asyncErrorBoundary(create),
  ],
  read: [
    asyncErrorBoundary(reservationExists), 
    asyncErrorBoundary(read),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    statusUnknown, 
    statusIsFinished, 
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    validateProperties, 
    hasRequiredProperties,
    hasValidDate, 
    hasValidTime, 
    peopleInteger, 
    asyncErrorBoundary(update),
  ],
};