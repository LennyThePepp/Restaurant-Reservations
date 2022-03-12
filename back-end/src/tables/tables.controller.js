const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

// error handlers
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tableExists = require("../errors/tablesErrors/tableExists");
const validateProperties = require("../errors/tablesErrors/validateProperties");
const hasProperties = require("../errors/tablesErrors/hasProperties");
const validTableName = require("../errors/tablesErrors/validTableName");
const validCapacity = require("../errors/tablesErrors/validCapacity");
const hasRequiredProperties = hasProperties("table_name", "capacity");
const tableNotOccupied = require("../errors/tablesErrors/tableNotOccupied");
const tableOccupied = require("../errors/tablesErrors/tableOccupied");
const hasReservationId = hasProperties("reservation_id");
const withinCapacity = require("../errors/tablesErrors/withinCapacity");
const reservationExists = require("../errors/tablesErrors/reservationExists");
const reservationSeated = require("../errors/tablesErrors/reservationSeated");

// list tables
async function list(req, res) {
  let data = await service.list();
  res.json({ data });
}

// creates a new table
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

// lists table based on table_id
async function read(req, res, next) {
  const { table: data } = res.locals;
  res.json({ data });
}

// updates status in table and reservation
async function update(req, res, next) {
  const updatedTable = {
    ...res.locals.table,
    reservation_id: Number(req.body.data.reservation_id),
  };
  await reservationsService.updateStatus(
    Number(req.body.data.reservation_id),
    "seated"
  );
  const data = await service.update(updatedTable);
  res.status(200).json({ data });
}

// deletes reservation_id and updates status
async function destroy(req, res) {
  const table_id = req.params.tableId;
  const table = res.locals.table;
  await service.unseatTable(table_id, table.reservation_id);
  res.status(200).json({});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [
    asyncErrorBoundary(tableExists), // makes sure table exists
    asyncErrorBoundary(read),
  ],
  update: [
    asyncErrorBoundary(tableExists), // makes sure tables exists
    hasReservationId, // makes sure the reservation Id is valid
    asyncErrorBoundary(reservationExists), // makes sure the reservation exists
    asyncErrorBoundary(withinCapacity), // makes sure the reservation is within table capacity
    tableOccupied, // makes sure table is not occupied
    asyncErrorBoundary(reservationSeated), // makes sure the reservation isn't already seated
    asyncErrorBoundary(update),
  ],
  create: [
    validateProperties, // makes sure table has all valid properties
    hasRequiredProperties, // makes sure required properties are there
    validTableName, // makes sure the table name is more than one character
    validCapacity, // makes sure that the capacity is a number
    asyncErrorBoundary(create),
  ],
  delete: [
    asyncErrorBoundary(tableExists), // makes sure table exists
    tableNotOccupied, // makes sure table is occupied
    asyncErrorBoundary(destroy),
  ],
};