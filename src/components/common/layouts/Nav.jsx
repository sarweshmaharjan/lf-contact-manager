import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ currentUser }) {

  const renderComponent = Object.keys(currentUser).length !== 0 ? (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to={"/contacts"}>
          Contacts
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/logout"}>
          Logout
        </Link>
      </li>
    </ul>
  ) : (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to={"/auth/login"}>
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/auth/register"}>
          Sign up
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to={Object.keys(currentUser).length !== 0?"/contacts":"/auth/login"}>
          Contact Management
        </Link>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarTogglerDemo02"
        >
            {renderComponent}
          {currentUser && (
            <div>{currentUser.name}</div>
          )}
        </div>
      </div>
    </nav>
  );
}
