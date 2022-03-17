import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// routes
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewTable from "../newtable/NewTable";
import NewReservation from "../newreservation/NewReservation";
import Seat from "../seat/Seat";
import Search from "../search/Search";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservationId/edit">
        <NewReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservationId/seat">
        <Seat />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
