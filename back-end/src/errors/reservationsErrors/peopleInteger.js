// makes sure people is an integer
function peopleInteger(req, res, next) {
    const people = req.body.data.people;
    if (typeof people !== "number") {
      return next({
        status: 400,
        message: `${people} people needs to be a number.`,
      });
    }
    next();
  }
  
  module.exports = peopleInteger;