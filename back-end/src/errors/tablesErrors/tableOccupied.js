// determines that the table is occupied
function tableOccupied(req, res, next) {
    const table = res.locals.table;
    if (table.reservation_id !== null) {
      return next({
        status: 400,
        message: "Table is occupied.",
      });
    }
    next();
  }
  
  module.exports = tableOccupied;