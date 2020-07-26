import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from "../context/user-context";

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = AuthContext;

  render() {
    const {isAuth, role} = this.context;
    const {path, exact, component} = this.props;

    if (isAuth && role === 'Admin') {
      return <Route path={path} exact={exact} component={component}/>
    }

    return isAuth
      ? (<Route path={path} exact={exact} component={component}/>)
      : (<Redirect to='/user/login'/>);
  }
}

export default PrivateRoute;
