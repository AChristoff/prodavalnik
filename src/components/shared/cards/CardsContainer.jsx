import React from 'react';

import OffersService from "../../../services/offers-service";
import Loading from "../Loading";
import Heading from "../Heading";
import Card from "./partials/Card";

class CardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      offers: [],
      isLoading: false,
    };
    this.method = props.method;
    this.headingText = props.headingText;
    this.isCreator = props.isCreator;
  }

  static service = new OffersService();

  render() {
    const {offers, isLoading, error} = this.state;

    if (isLoading) {
      return <Loading/>
    }

    console.log(error);
    if (error) {
      // TODO: toastr component;
      return (
        <div className="wrapper">
          Error: {error}!
        </div>
      );
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
              <Card key={offer._id} {...offer} isCreator={this.isCreator}/>
            ))
          }
        </div>
      </div>
    )
  }

  async componentDidMount() {

    this.isLoading = true;
    let res;

    try {
      if (this.method === 'all') {
        res = await CardsContainer.service.getAllOffers();
      } else {
        res = await CardsContainer.service.getUserOffers();
      }

      console.log(res);
      if (res.error) {
        const message = res.message + ' ' + res.error.message;
        throw new Error(message);
      }

      this.setState({
        offers: res.posts,
        isLoading: false,
        });
    } catch (error) {
      console.log(error);
      this.setState({
        error: error.message,
        isLoading: false,
      })
    }
  }
}

export default CardsContainer;
