import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

// CSS
import "../dashboard/Dashboard.css";

// Functions
import { listTables, readReservation, updateTable } from "../utils/api";

// Routes
import SeatHeader from "./SeatHeader";
import ErrorAlert from "../layout/ErrorAlert";

const Seat = () => {
  // setStates
  const [reservation, setReservation] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [selectValue, setSelectValue] = useState("");

  const history = useHistory();

  const reservationId = useParams().reservationId;

  // useEffects to load tables reservations
  useEffect(() => {
    function loadDashboard() {
      const abortController = new AbortController();
      readReservation(reservationId).then(setReservation).catch(setError);
      listTables(abortController.signal).then(setTables).catch(setError);
      return () => abortController.abort();
    }
    loadDashboard();
  }, [reservationId]);

  const changeHandler = (event) => {
    setSelectValue({ [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateTable(
      Number(selectValue.table_id),
      Number(reservationId),
      abortController.signal
    )
      .then(() => history.push("/dashboard"))
      .catch(setError);
    return () => abortController.abort();
  };

  return (
    <>
      <SeatHeader />
      <ErrorAlert error={error} />
      <div className="res">
        <h4>
          {reservation.first_name} {reservation.last_name}
        </h4>
        <p>party of {reservation.people}</p>
        <form onSubmit={submitHandler}>
          <label htmlFor="tables">Available Tables - Capacity</label>
          <br />
          {tables && (
            <div className="form-group">
              <select
                name="table_id"
                required
                onChange={changeHandler}
                className="seat-select"
              >
                <option value=""></option>
                {tables.map((table) => (
                  <option value={table.table_id} key={table.table_id}>
                    {table.table_name} - {table.capacity}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="row">
            <div className="col m-3">
              <button
                className="btn btn-secondary m-1"
                onClick={() => history.goBack()}
              >
                Cancel
              </button>
              <button className="btn btn-info m-1" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Seat;