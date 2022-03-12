// service
const service = require("../../tables/tables.service");

// determines that table exists
async function tableExists(req, res, next) {
  const table = await service.read(req.params.tableId);
  if (!table) {
    return next({
      status: 404,
      message: `${req.params.tableId} table cannot be found`,
    });
  }
  res.locals.table = table;
  next();
}

module.exports = tableExists;