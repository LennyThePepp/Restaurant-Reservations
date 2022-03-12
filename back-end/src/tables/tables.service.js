const knex = require("../db/connection");

// lists all tables
function list() {
  return knex("tables").select("*").orderBy("table_name");
}

// creates a new table
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

// lists table by table_id
function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

// updates table_id with reservation_id
function update(updatedTable) {
  return knex("tables")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .returning("*")
    .then((updatedTable) => updatedTable[0]);
}

// unseats table and clears sets reservation status
function unseatTable(table_id, reservation_id) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status: "finished" })
    .returning("*")
    .then(() => {
      return knex("tables")
        .where({ table_id })
        .update({ reservation_id: null })
        .returning("*");
    });
}

module.exports = {
  list,
  read,
  create,
  update,
  unseatTable,
};