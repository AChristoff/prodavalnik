import React from 'react';

import OffersService from "../../../services/offers-service";
import Loading from "../Loading";
import Heading from "../Heading";
import Card from "./partials/Card";
import OffersPagination from "../Pagination";
import {OfferContext} from "../../../context/offer-context";

class CardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      offers: [],
      pageCount: 1,
      isLoading: false,
    };
    this.method = props.method;
    this.headingText = props.headingText;
    this.isCreator = props.isCreator;
    this.page = props.page;
    this.limit = props.limit;
    this.sort = props.sort;
    this.order = props.order;
    this.search = props.search;
    this.filter = props.filter;
  }

  static service = new OffersService();
  static contextType = OfferContext;

  render() {
    const {offers, isLoading, pageCount, error} = this.state;
    const {currentPage, updateOfferContext} = this.context;

    if (isLoading) {
      return <Loading/>
    }

    if (error) {
      // TODO: toastr component;
      return (
        <div className="wrapper">
          Error: {error}!
        </div>
      );
    }

    if (!isLoading && !offers) {
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

        <OffersPagination
          currentPage={currentPage}
          pageCount={pageCount}
          update={updateOfferContext}/>

      </div>
    )
  }

  async componentDidMount() {
    const {page, limit, sort, order, search, filter} = this.props;
    const {currentPage, offersPerPage, updateOfferContext} = this.context;

    if (page) {
      updateOfferContext('currentPage', page);
    }

    if (limit) {
      updateOfferContext('offersPerPage', limit);
    }

    this.isLoading = true;
    let res;

    try {
      if (this.method === 'all') {
        res = await CardsContainer.service.getAllOffers(
          currentPage,
          offersPerPage,
          sort,
          order,
          search,
          filter);
      } else {
        res = await CardsContainer.service.getUserOffers();
      }

      const pageCount = Math.ceil(Number(res.count) / offersPerPage);
      console.log(res.count);
      console.log(pageCount);

      if (res.error) {
        const message = res.message + ' ' + res.error.message;
        throw new Error(message);
      }

      this.setState({
        offers: res.posts,
        pageCount: pageCount,
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
