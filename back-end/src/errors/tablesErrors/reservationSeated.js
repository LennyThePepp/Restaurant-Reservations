// service
const service = require("../../reservations/reservations.service");

// determines if the reservation is seated
async function reservationSeated(req, res, next) {
  const res2 = req.body.data.reservation_id;
  const reservation = await service.read(res2);
  if (reservation.status === "seated") {
    next({
      status: 400,
      message: "Reservation is already seated",
    });
  }
  return next();
}

module.exports = reservationSeated;