// returns 400 is status isn't one of the following.
function statusUnknown(req, res, next) {
    const statusArray = ["finished", "seated", "cancelled", "booked"];
    const status = req.body.data.status;
    if (!statusArray.includes(status)) {
      return next({
        status: 400,
        message: "reservation has an unknown status",
      });
    }
    return next();
  }
  
  module.exports = statusUnknown;