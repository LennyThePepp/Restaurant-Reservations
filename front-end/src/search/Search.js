import React, { useState } from "react";

// CSS
import "../newreservation/newReservation.css";

// Functions
import { listReservations } from "../utils/api";

// Routes
import Reservation from "../dashboard/Reservation";
import ErrorAlert from "../layout/ErrorAlert";
import SearchHeader from "./SearchHeader";

const Search = () => {
  // setStates
  const [error, setError] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [click, setClick] = useState(false);
  const [reservations, setReservations] = useState([]);

  // updates the mobileNumber state
  const changeHandler = ({ target }) => {
    setMobileNumber(target.value);
  };

  // sends the mobileNumber to API
  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setError(null);
    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .then(() => setClick(true))
      .catch(setError);
    return () => abortController.abort();
  };

  return (
    <>
      <SearchHeader />
      <ErrorAlert error={error} />
      <div className="row formStyle">
        <form onSubmit={submitHandler}>
          <div className="col">
            <input
              name="mobile_number"
              id="mobile_number"
              type="text"
              value={mobileNumber ? mobileNumber : undefined}
              placeholder="Enter a phone number"
              onChange={changeHandler}
              className="m-4"
            />
          </div>
          <button className="btn btn-info m-1" type="submit">
            Find
          </button>
        </form>
      </div>
      <div className="">
        {click &&
          reservations.map((reservation) => (
            <Reservation reservation={reservation} key={reservation.reservation_id} />
          ))}
        {reservations.length === 0 && (
          <h4 className="alert alert-danger">No reservations found.</h4>
        )}
      </div>
    </>
  );
};

export default Search;