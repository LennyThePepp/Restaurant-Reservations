// service
const service = require("../../reservations/reservations.service");

// determines that the reservation exists
async function reservationExists(req, res, next) {
  const reservation = await service.read(req.body.data.reservation_id);
  if (!reservation) {
    next({
      status: 404,
      message: `reservation_id ${req.body.data.reservation_id} doesn't exist`,
    });
  }
  next();
}

module.exports = reservationExists;