// for create 
// returns 400 is the status is finished or seated.
function statusReport(req, res, next) {
    const status = req.body.data.status;
    const reservationId = req.params.reservation_id;
    if (status === "finished") {
      return next({
        status: 400,
        message: `The reservation_id ${reservationId} status is finished dining.`,
      });
    } else if (status === "seated") {
      return next({
        status: 400,
        message: `The reservation_id ${reservationId} status is already seated.`,
      });
    }
    return next();
  }
  
  module.exports = statusReport;