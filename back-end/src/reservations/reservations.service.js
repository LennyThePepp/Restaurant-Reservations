const knex = require("../db/connection");

// lists reservations for date by time
function list(reservation_date) {
  return knex("reservations")
    .select("*")
    .where(function () {
      this.where({ reservation_date })
        .andWhere({ status: "booked" })
        .orWhere({ status: "seated" });
    })
    .orderBy("reservation_time");
}

// returns reservation matching phone number
function readPhoneNumber(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

// selects reservation by id
function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

// creates new reservation
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

// updates reservation status
function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update("status", status)
    .returning("*")
    .then((updatedRes) => updatedRes[0]);
}

function update(updatedReservation) {
  return knex("reservations")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .returning("*")
    .then((updatedRes) => updatedRes[0]);
}

module.exports = {
  list,
  read,
  create,
  updateStatus,
  readPhoneNumber,
  update,
};