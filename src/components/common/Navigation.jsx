import React from 'react';
import {NavLink} from "react-router-dom";

export function Navigation() {
  return (
    <nav>
      <ul className="App-header">
        <li><NavLink to="/" exact activeStyle={{color: 'red'}}>Home</NavLink></li>
        <li><NavLink to="/about" activeStyle={{color: 'red'}}>About</NavLink></li>
        <li><NavLink to="/contacts" activeStyle={{color: 'red'}}>Contacts</NavLink></li>
      </ul>
    </nav>
  );
}
