import React from 'react';

import {Redirect} from "react-router-dom";
import {AuthContext} from "../../../context/user-context";

class Logout extends React.Component {
  static contextType = AuthContext;

  componentWillMount() {
    const {updateUserData} = this.context;

    window.localStorage.clear();
    updateUserData({
      isAuth: false,
      username: '',
      role: '',
    });
  }

  render() {
    return (
      <Redirect to='/'/>
    );
  }
}

export default Logout;
