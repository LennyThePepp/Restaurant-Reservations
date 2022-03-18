import React from "react";

import { Link, NavLink } from "react-router-dom";
import "./menu.css";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav role="navigation">
      <div className="min">
        <ul id="menu">
          <li className="name">
            <Link to={"/dashboard"}>
              <span>Periodic Tables</span>
            </Link>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/dashboard">
              <span />
              &nbsp;Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/search">
              <span />
              &nbsp;Search
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/reservations/new">
              <span />
              &nbsp;New Reservation
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/tables/new">
              <span />
              &nbsp;New Table
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;