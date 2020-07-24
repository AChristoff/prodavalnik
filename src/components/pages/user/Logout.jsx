import React from 'react';

import {Redirect} from "react-router-dom";
import {UserConsumer} from "../../../context/user-context";

class LogoutContext extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {updateUserData} = this.props;

    window.localStorage.clear();
    updateUserData({
      isAuth: false,
      username: '',
      role: '',
      updateUserData,
    });
  }

  render() {
    return (
      <Redirect to='/'/>
    );
  }
}

const Logout = (props) => {

  return (
    <UserConsumer>
      {
        (user) => (
          <LogoutContext
            {...props}
            isAuth={user.isAuth}
            updateUserData={user.updateUserData}
          />
        )
      }
    </UserConsumer>
  );
};

export default Logout;
