import React, { Component, createContext} from "react";

export const AlertContext = createContext();

class AlertContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorContext: '',
      successContext: '',
      warningContext: '',
      counter: 0,
    };
  }

  updateAlertContext = (key, value) => {
    this.setState({[key]: value})
  };

  render() {
    return (
      <AlertContext.Provider value={{...this.state, updateAlertContext: this.updateAlertContext}}>
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}

export default AlertContextProvider;