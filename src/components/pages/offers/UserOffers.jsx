import React from 'react';

import CardsContainer from "../../shared/cards/CardsContainer";

class UserOffers extends React.Component {
  render() {

    return (
      <CardsContainer
        method='user'
        headingText='My Offers'
        isCreator={true}
        history={this.props.history}
      />
    )
  }
}

export default UserOffers;
