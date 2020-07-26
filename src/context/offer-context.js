import React, { Component, createContext} from "react";

export const OfferContext = createContext({});

class OfferContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageCount: 10,
    };
  }

  changePage = (nextPage) => {
    this.setState({
      currentPage: nextPage,
    })
  };

  render() {
    return (
      <OfferContext.Provider value={{...this.state, changePage: this.changePage}}>
        {this.props.children}
      </OfferContext.Provider>
    );
  }
}

export default OfferContextProvider;
