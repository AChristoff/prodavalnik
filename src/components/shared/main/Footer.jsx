import React from 'react';

import {Copyright} from "@material-ui/icons";
import logo from '../../../assets/svg/aleksov-logo.svg';
import {NavLink} from "react-router-dom";

export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="wrapper">
        <Copyright className="copy-icon"/> 2019-{currentYear} All rights reserved
        <span className="site-name">
            <NavLink to="/">Prodavalnik </NavLink>
          </span> |
        <span className="dev-by">
            developed by
          </span>
        <a className="developer" href="https://alekshristov.com/" target="_blank">
          <img title="aleksov-logo" src={logo}></img>
        </a>
      </div>
    </footer>
  );
}
