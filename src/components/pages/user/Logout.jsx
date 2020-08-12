import React, {useContext, useEffect} from 'react';

import {Redirect} from "react-router-dom";
import {AuthContext} from "../../../context/user-context";
import {AlertContext} from "../../../context/alert-context";

export default function Logout() {

  const {updateUserData} = useContext(AuthContext);
  const {updateAlertContext} = useContext(AlertContext);

  //Component did mount
  useEffect(() => {
    updateAlertContext('successContext', 'Successfully logged out');
    window.localStorage.clear();
    updateUserData({
      isAuth: false,
      username: '',
      role: '',
    });
  }, []);

  return (
    <Redirect to='/'/>
  );
}
