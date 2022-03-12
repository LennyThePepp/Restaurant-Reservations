// service
const reservationsService = require("../../reservations/reservations.service");

// makes sure reservation exists and sends it to locals
async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    next();
  } else {
    next({
      status: 404,
      message: `Reservation id does not exist: ${req.params.reservationId}`,
    });
  }
}

module.exports = reservationExists;