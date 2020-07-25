import React from 'react';
import {NavLink, Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {UserConsumer} from "../../../context/user-context";

class NavigationWithContex extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleClick = () => {
  //   const {updateUserData} = this.props;
  //
  //   updateUserData({
  //     isAuth: false,
  //     username: '',
  //     role: '',
  //   });
  //   window.localStorage.clear();
  //   return <Redirect to='/'/>
  // };

  render() {
    const {isAuth, username} = this.props;

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
            <NavLink to="/offers" exact activeClassName="active">
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

const Navigation = (props) => {

  return (
    <UserConsumer>
      {
        (user) => (
          <NavigationWithContex
            {...props}
            isAuth={user.isAuth}
            username={user.username}
            updateUserData={user.updateUserData}
          />
        )
      }
    </UserConsumer>
  );
};

export default Navigation;
