import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from "../context/user-context";

class PrivateRoute extends React.Component {

  static contextType = AuthContext;

  render() {
    const {isAuth, role} = this.context;
    const {path, exact, component, adminRoute = false} = this.props;
    const isAdmin = role === 'Admin';

    if (adminRoute && isAuth && isAdmin) {
      return <Route path={path} exact={exact} component={component}/>
    } else if (adminRoute && !isAdmin){
      return <Redirect to='/'/>
    }

    return isAuth
      ? (<Route path={path} exact={exact} component={component}/>)
      : (<Redirect to='/user/login'/>);
  }
}

export default PrivateRoute;
