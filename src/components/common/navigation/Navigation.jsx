import React from 'react';
import {NavLink} from "react-router-dom";

export function Navigation() {

  return (
    <nav className="site-nav">
      <ul>
        <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/user/login" exact activeClassName="active">Login</NavLink></li>
        <li><NavLink to="/user/register" activeClassName="active">Register</NavLink></li>
      </ul>
    </nav>
  );
}
