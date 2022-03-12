// determines that the table name is a valid length
function validTableName(req, res, next) {
    const tableName = req.body.data.table_name;
    if (tableName.length === 1) {
      return next({
        status: 400,
        message: `table_name ${tableName} must be more than one character`,
      });
    }
    next();
  }
  
  module.exports = validTableName;