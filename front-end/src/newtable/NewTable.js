import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Routes
import NewTableHeader from "./NewTableHeader";
import ErrorAlert from "../layout/ErrorAlert";

// Functions
import { createTable } from "../utils/api";

const NewTable = () => {
  // setStates
  const [table, setTable] = useState({});
  const [error, setError] = useState(null);

  const history = useHistory();

  // updates table state
  function changeHandler({ target: { name, value } }) {
    setTable((previousTable) => ({
      ...previousTable,
      [name]: value,
    }));
  }

  // submits new table to API
  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    if (withinRestraints(table.table_name)) {
      createTable(table, abortController.signal);
      history.push(`/dashboard`);
      return () => abortController.abort();
    }
  };

  // makes sure new table meets criteria before going to backend
  function withinRestraints(name) {
    const errorArray = [];
    if (name < 2) {
      errorArray.push("Table name must be more than one character.");
    }
    if (errorArray.length) {
      setError(new Error(errorArray.toString()));
      return false;
    }
    return true;
  }

  return (
    <>
      <NewTableHeader />
      <ErrorAlert error={error} />
      <div className="row formStyle">
        <form onSubmit={submitHandler}>
          <label htmlFor="name">New Table</label>

          <div className="row">
            <div className="col">
              <input
                id="table_name"
                type="text"
                name="table_name"
                placeholder="Table Name"
                minlength="1"
                value={table.table_name}
                onChange={changeHandler}
                className="form-control"
                required
              />
            </div>
            <div className="col">
              <input
                id="capacity"
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={table.capacity}
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

export default NewTable;