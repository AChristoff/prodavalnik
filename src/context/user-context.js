import React, {Component, createContext} from "react";

export const AuthContext = createContext({});

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: window.localStorage.getItem('username') || '',
      role: window.localStorage.getItem('role') || '',
      isAuth: !!window.localStorage.getItem('token'),
    };
  }

  updateUserData = ({username, role, isAuth}) => {
    this.setState({
      username,
      role,
      isAuth,
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
