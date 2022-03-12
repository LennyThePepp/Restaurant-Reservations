// determines that the capacity is a number
function validCapacity(req, res, next) {
    const capacity = req.body.data.capacity;
    if (typeof capacity !== "number") {
      return next({
        status: 400,
        message: "capacity must be a number",
      });
    }
    next();
  }
  
  module.exports = validCapacity;