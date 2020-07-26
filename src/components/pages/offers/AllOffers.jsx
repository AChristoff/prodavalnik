import React from 'react';
import CardsContainer from "../../shared/cards/CardsContainer";

class AllOffers extends React.Component {
  constructor(props) {
    super(props);
    this.params = props.match.params;
  }

  render() {

    return (
      <CardsContainer
        method='all'
        headingText='Offers'
        {...this.params}/>
    )
  }
}

export default AllOffers;
