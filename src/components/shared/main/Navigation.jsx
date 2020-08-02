import React from 'react';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {AuthContext} from "../../../context/user-context";
import {Home} from "@material-ui/icons";
import Submenu from "../submenu/Submenu";
import Conditional from "../Conditional";

class Navigation extends React.Component {
  static contextType = AuthContext;

  render() {
    const {isAuth, username} = this.context;

    return (
      <nav className="site-nav">


        <ul>

          <li>
            <NavLink to="/" exact activeClassName="active">
              <Button variant="contained" color="primary" disableElevation>
                <Home/>
              </Button>
            </NavLink>
          </li>

          <li className="all-offers-tab">
            <NavLink to="/offers/all" exact activeClassName="active">
              <Button variant="contained" color="primary" disableElevation>
                Offers
              </Button>
            </NavLink>
          </li>

          <Conditional if={isAuth}>
              <Submenu username={username}/>
          </Conditional>

          <Conditional if={!isAuth}>
            <li>
              <NavLink to="/user/register" activeClassName="active">
                <Button variant="contained" color="primary" disableElevation>
                  Register
                </Button>
              </NavLink>
            </li>
          </Conditional>

          <Conditional if={!isAuth}>
              <li>
                <NavLink to="/user/login" exact activeClassName="active">
                  <Button variant="contained" color="primary" disableElevation>
                    Login
                  </Button>
                </NavLink>
              </li>
          </Conditional>

        </ul>
      </nav>
    );
  }
}

export default Navigation;
