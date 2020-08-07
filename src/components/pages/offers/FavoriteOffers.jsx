import React from 'react';
import {OfferContext} from "../../../context/offer-context";
import CardsContainer from "../../shared/cards/CardsContainer";

class FavoriteOffers extends React.Component {
  constructor(props) {
    super(props);
    this.params = props.match.params;
  }

  static contextType = OfferContext;

  render() {
    const {currentPage, search} = this.context;

    return (
      <CardsContainer
        method='favorites'
        headingText='Favorite Offers'
        currentPage={currentPage}
        search={search}
        {...this.params}
      />
    )
  }
}

export default FavoriteOffers;