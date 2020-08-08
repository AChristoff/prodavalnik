import React, { Component, createContext} from "react";

export const OfferContext = createContext({});

class OfferContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      offersPerPage: 3,
      sort: '',
      order: -1,
      search: '',
      filter: '',
      favoritesContext: 0,
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
