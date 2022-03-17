import React from "react";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";

import { cancelReservation } from "../utils/api";

const Reservation = ({ reservation, resId }) => {
  const history = useHistory();

  // cancelReservation handler
  async function cancelHandler(reservation) {
    const abortController = new AbortController();
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      reservation.status = "cancelled";
      await cancelReservation(reservation, abortController.signal);
      history.push(`/reservations?date=${reservation.reservation_date}`);
      return () => abortController.abort();
    }
  }

  return (
    <>
      <ul className="res" key={reservation.reservation_id}>
        <li>{reservation.people} people for</li>
        <li>
          {reservation.first_name} {reservation.last_name}
        </li>
        <li>at {reservation.reservation_time}</li>
        <li> Contact number: {reservation.mobile_number} </li>
        <li data-reservation-id-status={reservation.reservation_id}>
          Status: {reservation.status}
        </li>
        {reservation.status === "booked" && (
          <>
            <button
              className="m-1 btn btn-danger btn-sm"
              onClick={() => cancelHandler(reservation)}
              data-reservation-id-cancel={reservation.reservation_id}
            >
              Cancel
            </button>
            <a
              className="m-1 btn btn-info btn-sm"
              href={`/reservations/${reservation.reservation_id}/seat`}
            >
              Seat
            </a>
            <a
              className="m-1 btn btn-secondary btn-sm"
              href={`/reservations/${reservation.reservation_id}/edit`}
            >
              Edit
            </a>
          </>
        )}
      </ul>
    </>
  );
};

export default Reservation;