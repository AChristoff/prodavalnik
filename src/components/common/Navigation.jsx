import React from 'react';
import {NavLink} from "react-router-dom";

export function Navigation() {
  return (
    <nav>
      <ul className="App-header">
        <li><NavLink to="/" exact activeStyle={{color: 'red'}}>Home</NavLink></li>
        <li><NavLink to="/user/login" exact activeStyle={{color: 'red'}}>Login</NavLink></li>
        <li><NavLink to="/user/register" activeStyle={{color: 'red'}}>Register</NavLink></li>
      </ul>
    </nav>
  );
}
