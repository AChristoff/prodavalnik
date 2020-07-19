import React from 'react';

import {Copyright} from "@material-ui/icons";
import logo from '../../assets/img/aleksov-logo.svg';
import {NavLink} from "react-router-dom";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.currentYear = '';
  }

  componentWillMount() {
    this.currentYear = new Date().getFullYear();
  }

  render() {
    return (
      <footer className="app-footer">
        <div className="wrapper">
          <Copyright className="copy-icon"/> 2019-{this.currentYear} All rights reserved
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
}

export default Footer;
