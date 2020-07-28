import React from 'react';
import CardsContainer from "../../shared/cards/CardsContainer";
import {OfferContext} from "../../../context/offer-context";

class AllOffers extends React.Component {
  constructor(props) {
    super(props);
    this.params = props.match.params;
  }

  static contextType = OfferContext;

  render() {
    const {currentPage, search} = this.context;

    return (
      <CardsContainer
        method='all'
        headingText='Offers'
        currentPage={currentPage}
        search={search}
        {...this.params}
      />
    )
  }
}

export default AllOffers;
