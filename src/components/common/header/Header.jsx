import React from 'react';
import {Navigation} from "../navigation/Navigation";
import {NavLink} from "react-router-dom";
import {Loyalty} from "@material-ui/icons";

export function Header() {
  return (

    <header className="app-header">

      <div className="wrapper">
        <NavLink to="/" className="header-logo">
          Prodavalnik <Loyalty/>
        </NavLink>

        <Navigation/>
      </div>

    </header>
  );
}
