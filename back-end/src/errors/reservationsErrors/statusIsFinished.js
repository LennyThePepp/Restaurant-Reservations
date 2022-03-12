// returns 400 if status is finished
function statusIsFinished(req, res, next) {
    const reservation = res.locals.reservation;
    if (reservation.status === "finished") {
      next({
        status: 400,
        message: "Reservation is finished and cannot be updated",
      });
    }
    return next();
  }
  
  module.exports = statusIsFinished;