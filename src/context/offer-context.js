import React, { Component, createContext} from "react";

export const OfferContext = createContext({});

class OfferContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      offersPerPage: 6,
    };
  }

  updateOfferContext = (key, value) => {
    this.setState({[key]: value})
  };

  render() {
    return (
      <OfferContext.Provider value={{...this.state, updateOfferContext: this.updateOfferContext}}>
        {this.props.children}
      </OfferContext.Provider>
    );
  }
}

export default OfferContextProvider;
