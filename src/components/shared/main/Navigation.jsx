import React from 'react';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {AuthContext} from "../../../context/user-context";

class Navigation extends React.Component {
  static contextType = AuthContext;

  render() {
    const {isAuth, username} = this.context;

    return (
      <nav className="site-nav">

        {
          isAuth
            ? <span className="greeter">Hello, {username}!</span>
            : null
        }

        <ul>

          <li>
            <NavLink to="/" exact activeClassName="active">
              <Button variant="contained" color="primary" disableElevation>Home</Button>
            </NavLink>
          </li>

          <li>
            <NavLink to="/offers/all" exact activeClassName="active">
              <Button variant="contained" color="primary" disableElevation>Offers</Button>
            </NavLink>
          </li>

          {
            isAuth
              ? <li>
                <NavLink to="/user/offers" exact activeClassName="active">
                  <Button variant="contained" color="primary" disableElevation>My Offers</Button>
                </NavLink>
              </li>
              : null
          }

          {
            isAuth
              ? <li>
                <NavLink to="/offers/create" exact activeClassName="active">
                  <Button variant="contained" color="primary" disableElevation>Create Offers</Button>
                </NavLink>
              </li>
              : null
          }

          {
            isAuth
              ? null
              : <li>
                <NavLink to="/user/register" activeClassName="active">
                  <Button variant="contained" color="primary" disableElevation>Register</Button>
                </NavLink>
              </li>
          }

          {
            isAuth
              ? <li>
                <NavLink to="/user/logout" exact activeClassName="active">
                  <Button variant="contained" color="primary" disableElevation>Logout</Button>
                </NavLink>
              </li>
              : <li>
                <NavLink to="/user/login" exact activeClassName="active">
                  <Button variant="contained" color="primary" disableElevation>Login</Button>
                </NavLink>
              </li>
          }

        </ul>
      </nav>
    );
  }
}

export default Navigation;
