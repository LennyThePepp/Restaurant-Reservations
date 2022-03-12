// determines that the table is not occupied
function tableNotOccupied(req, res, next) {
    const table = res.locals.table;
    if (table.reservation_id === null) {
      return next({
        status: 400,
        message: "Table is not occupied.",
      });
    }
    next();
  }
  
  module.exports = tableNotOccupied;