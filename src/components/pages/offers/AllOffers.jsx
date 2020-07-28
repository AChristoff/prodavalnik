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
    const {currentPage} = this.context;

    return (
      <CardsContainer method='all' headingText='Offers'{...this.params} currentPage={currentPage}/>
    )
  }
}

export default AllOffers;
