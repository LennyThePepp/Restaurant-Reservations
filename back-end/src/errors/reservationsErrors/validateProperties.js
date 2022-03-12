const VALID_PROPERTIES = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
    "status",
    "reservation_id",
    "created_at",
    "updated_at",
  ];
  
  // compares properties in relation to DB to make sure they're valid
  function validateProperties(req, res, next) {
    const { data = {} } = req.body;
  
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
  
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
  
    next();
  }
  
  module.exports = validateProperties;