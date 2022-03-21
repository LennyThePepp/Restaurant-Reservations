import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// CSS
import "./Dashboard.css";

// Routes
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "./Reservation";
import ReservationHeader from "./ReservationHeader";
import Tables from "./Tables";
import { today, next, previous } from "../utils/date-time";

// Functions
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery";
const dayjs = require("dayjs");

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard() {
  const query = useQuery();

  // set up for reservations and error handler
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [date, setDate] = useState(query.get("date") || today());

  const history = useHistory();

  // loads reservations and tables from API and sets them
  useEffect(() => {
    function loadDashboard() {
      const abortController = new AbortController();
      setError(null);
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setError);
      listTables().then(setTables).catch(setError);
      return () => abortController.abort();
    }
    loadDashboard();
  }, [date]);

  useEffect(() => {
    history.push(`dashboard?date=${date}`);
  }, [date, history]);

  //Change date handlers
  const prevDate = (date) => {
    setDate(previous(date));
    history.push(`/dashboard?date=${previous(date)}`);
  };

  const nextDate = (date) => {
    setDate(next(date));
    history.push(`/dashboard?date=${next(date)}`);
  };

  const jumpToToday = (date) => {
    setDate(today(date));
    history.push(`/dashboard?date=${today()}`);
  };

  return (
    <>
      <ReservationHeader />
      <ErrorAlert error={error} />
      <main className="dashboard">
        <h4>
          <button className="btn dir" onClick={() => prevDate(date)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="white"
              className="bi bi-chevron-compact-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
              />
            </svg>
          </button>
          {(dayjs().format("MMMM DD, YYYY") ===
            dayjs(date).format("MMMM DD, YYYY") && (
            <button className="btn btn-info btn-lg today" disabled style={{ opacity: "1" }}>
              Today
            </button>
          )) || (
            <button
              className="btn btn-info btn-lg today"
              onClick={() => jumpToToday(date)}
            >
              Jump to today
            </button>
          )}
          <button className="btn dir" onClick={() => nextDate(date)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="white"
              className="bi bi-chevron-compact-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
              />
            </svg>
          </button>
        </h4>
        <h4>{dayjs(date).format("dddd MMMM DD, YYYY")}</h4>

        {reservations.map((res) => (
          <Reservation reservation={res} key={res.reservation_id}/>
        ))}

        {reservations.length === 0 && (
          <h4 className="alert alert-danger">No reservations for today.</h4>
        )}
        <h4>Tables</h4>
        {tables.map((table) => (
          <Tables table={table} key={table.table_id}/>
        ))}
      </main>
    </>
  );
}

export default Dashboard;