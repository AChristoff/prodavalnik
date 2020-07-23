import React from 'react';

import OffersService from "../../../services/offers-service";
import Loading from "../Loading";
import Heading from "../Heading";
import Card from "./partials/Card";

class CardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      isLoading: false,
    };
    this.method = props.method;
    this.headingText = props.headingText;
  }

  static service = new OffersService();

  render() {
    const {offers, isLoading} = this.state;

    if (isLoading) {
      return <Loading/>
    }

    if (!isLoading && !offers.length) {
      return (
        <div className="all-offers wrapper">
          <Heading text={this.headingText}/>
          <h5>No offers found!</h5>
        </div>
      )
    }

    return (
      <div className="all-offers wrapper">

        <Heading text={this.headingText}/>

        <div className="card-list">
          {
            offers.map((offer) => (
              <Card key={offer._id} {...offer} />
            ))
          }
        </div>
      </div>
    )
  }

  async componentDidMount() {

    this.isLoading = true;
    let offers;

   ;

    try {
      if (this.method === 'all') {
        offers = await CardsContainer.service.getAllOffers();
      } else {
        offers = await CardsContainer.service.getUserOffers();
      }
      this.setState({offers: offers.posts});
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
    }
  }
}

export default CardsContainer;
