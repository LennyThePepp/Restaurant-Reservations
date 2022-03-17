import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// CSS
import "./newReservation.css";

// Routes
import ErrorAlert from "../layout/ErrorAlert";
import NewReservationHeader from "./NewReservationHeader";

// Functions
import {
  createReservation,
  readReservation,
  updateReservation,
} from "../utils/api";
import { today } from "../utils/date-time";
const dayjs = require("dayjs");

const NewReservation = () => {
  // setStates
  const [reservation, setReservation] = useState({});
  const [errors, setErrors] = useState(null);

  const history = useHistory();

  const reservationId = useParams().reservationId;

  // inserts information from form as typed to reservation state
  function changeHandler({ target: { name, value } }) {
    if (reservationId) {
      setReservation((previousReservation) => ({
        ...previousReservation,
        reservation_id: Number(reservation.reservation_id),
        created_at: reservation.created_at,
        updated_at: new Date(),
        [name]: value,
      }));
    } else {
      setReservation((previousReservation) => ({
        ...previousReservation,
        [name]: value,
      }));
    }
  }

  // submits reservation state to the createReservation function then sends user to dashboard date of
  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const valid = withinRestraints();
    if (reservationId) {
      if (valid) {
        await updateReservation(reservation, abortController.signal);
        history.push(`/dashboard?date=${reservation.reservation_date}`);
        return () => abortController.abort();
      }
    } else {
      if (valid) {
        await createReservation(reservation, abortController.signal);
        history.push(`/dashboard?date=${reservation.reservation_date}`);
        return () => abortController.abort();
      }
    }
  }

  useEffect(() => {
    function loadDashboard() {
      const abortController = new AbortController();
      setErrors(null);
      if (reservationId) {
        readReservation(reservationId, abortController.signal)
          .then(setReservation)
          .catch(setErrors);
        return () => abortController.abort();
      }
    }
    loadDashboard();
  }, [reservationId]);

  // formats reservation_date
  const resDate = dayjs(reservation.reservation_date).format("dddd");

  // formats current time
  const currentTime = dayjs().format("HH:mm:ss").toString().split(":").join("");

  // formats inputted time
  let splitTime;
  function validTime(time) {
    if (time) {
      splitTime = Number(time.toString().split(":").slice(0, 2).join(""));
    }
    return splitTime;
  }

  let formattedDate;
  function formatDate(date) {
    if (date) {
      formattedDate = date.split("T")[0];
    }
    return formattedDate;
  }

  formatDate(reservation.reservation_date);
  validTime(reservation.reservation_time);

  // Error handler
  function withinRestraints() {
    const errorArray = [];
    if (splitTime > 2130) {
      errorArray.push("Reservations only available before 9:30pm.");
    } else if (splitTime <= 1029) {
      errorArray.push("Reservations only available after 10:30am.");
    } else if (
      splitTime <= currentTime &&
      reservation.reservation_date === today()
    ) {
      errorArray.push("Reservations must be set after current time.");
    } else if (reservation.reservation_date < today()) {
      errorArray.push("Reservations only available for future dates.");
    } else if (resDate === "Tuesday") {
      errorArray.push("Sorry, we are closed on Tuesdays.");
    }
    if (errorArray.length) {
      setErrors(new Error(errorArray.toString()));
      return false;
    }
    return true;
  }

  return (
    <>
      <NewReservationHeader />
      <ErrorAlert error={errors} />

      <div className="formStyle">
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name</label>

          <div className="row">
            <div className="col">
              <input
                id="firstName"
                type="text"
                name="first_name"
                placeholder="First Name"
                value={reservation.first_name}
                onChange={changeHandler}
                className="form-control"
                required
              />
            </div>
            <div className="col">
              <input
                id="lastName"
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={reservation.last_name}
                onChange={changeHandler}
                className="form-control"
                required
              />
            </div>
          </div>
          <label htmlFor="phone">Mobile Number</label>

          <input
            id="phone"
            type="tel"
            name="mobile_number"
            placeholder="555-555-5555"
            value={reservation.mobile_number}
            onChange={changeHandler}
            className="form-control"
            autoCorrect="tel-local"
            required
          />

          <div className="row">
            <div className="col">
              <label htmlFor="date">Reservation Date</label>
            </div>
            <div className="col">
              <label htmlFor="time">Time</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="date"
                id="date"
                name="reservation_date"
                value={formattedDate}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="col">
              <input
                type="time"
                id="appt"
                name="reservation_time"
                value={reservation.reservation_time}
                onChange={changeHandler}
                placeholder={reservation.reservation_time}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="party">Party Size</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                id="partSize"
                type="number"
                name="people"
                placeholder="Party Size"
                min="1"
                value={reservation.people}
                onChange={changeHandler}
                className="form-control"
                required
              />
            </div>
          </div>
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

export default NewReservation;