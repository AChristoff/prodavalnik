import React from 'react';

import Card from "../../shared/card/Card";
import Loading from "../../shared/Loading";

import OffersService from '../../../services/offers-service'
import Heading from "../../shared/Heading";

class AllOffers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      isLoading: false,
    };
  }


  static service = new OffersService();

  render() {
    const {offers, isLoading} = this.state;

    if (isLoading) {
      return <Loading/>
    }

    if (!isLoading && !offers.length) {
      return (
        <div className="wrapper">
          <h5>Currently there are no offers!</h5>
        </div>
      )
    }

    return (
      <div className="all-offers wrapper">

        <Heading text="Offers"/>

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

    try {
      const offers = await AllOffers.service.getAllOffers();
      this.setState({offers: offers.posts});
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
    }
  }
}

export default AllOffers;
