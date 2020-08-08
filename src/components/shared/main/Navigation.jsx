import React from 'react';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {AuthContext} from "../../../context/user-context";
import {Facebook, Home, Share} from "@material-ui/icons";
import Submenu from "../submenu/Submenu";
import Conditional from "../Conditional";

class Navigation extends React.Component {
  static contextType = AuthContext;

  render() {
    const {isAuth, username} = this.context;
    const baseUrl = `${process.env.REACT_APP_API}`;

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

          <li className="share-icon">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://prodavalnik.herokuapp.com/`} target="_blank">
              <Facebook/>
            </a>
          </li>

        </ul>
      </nav>
    );
  }
}

export default Navigation;
