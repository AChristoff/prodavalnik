import React, {Component, createContext} from "react";

export const AuthContext = createContext({});

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: !!window.localStorage.getItem('token'),
      username: window.localStorage.getItem('username') || '',
      role: window.localStorage.getItem('role') || '',
    };
  }

  updateUserData = ({username, role, isAuth}) => {
    this.setState({
      isAuth,
      username,
      role,
    })
  };

  updateUserContext = (key, value) => {
    this.setState({[key]: value})
  };

  render() {
    return (
      <AuthContext.Provider
        value={{...this.state,
          updateUserData: this.updateUserData,
          updateUserContext: this.updateUserContext}}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
