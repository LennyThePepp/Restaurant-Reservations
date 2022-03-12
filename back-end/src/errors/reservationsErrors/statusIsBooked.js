// Responds 400 is reservation isn't Booked.
async function statusIsBooked(req, res, next) {
    const status = req.body.data.status;
    const reservationId = req.params.reservation_id;
    if (status !== "booked") {
      return next({
        status: 400,
        message: `The reservation_id ${reservationId} status is not booked.`,
      });
    }
    return next();
  }
  
  module.exports = statusIsBooked;
  
  