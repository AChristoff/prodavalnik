import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {UserConsumer} from "../context/user-context";

function RouteContext(props) {
  const {path, exact, component, isAuth, role } = props;

  if (isAuth && role === 'Admin') {
    return <Route path={path} exact={exact} component={component}/>
  }

  return isAuth
    ? (<Route path={path} exact={exact} component={component}/>)
    : (<Redirect to='/user/login'/>);
}

const PrivateRoute = (props) => {

  return (
    <UserConsumer>
      {
        (user) => (
          <RouteContext
            {...props}
            isAuth={user.isAuth}
            role={user.role}
          />
        )
      }
    </UserConsumer>
  );
};

export default PrivateRoute;
