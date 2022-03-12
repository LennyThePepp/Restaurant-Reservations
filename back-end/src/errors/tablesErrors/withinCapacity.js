// service
const service = require("../../reservations/reservations.service");

// determines that table has a large enough capacity
async function withinCapacity(req, res, next) {
  const table = res.locals.table;
  const reservation = await service.read(req.body.data.reservation_id);
  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message: `Table does not have sufficient capacity`,
    });
  }
  next();
}

module.exports = withinCapacity;