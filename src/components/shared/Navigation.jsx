import React from 'react';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

export function Navigation() {

  return (
    <nav className="site-nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            <Button variant="contained" color="primary" disableElevation>Home</Button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/login" exact activeClassName="active">
            <Button variant="contained" color="primary" disableElevation>Login</Button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/register" activeClassName="active">
            <Button variant="contained" color="primary" disableElevation>Register</Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
