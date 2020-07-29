import React from 'react';

import OffersService from "../../../services/offers-service";
import Loading from "../Loading";
import Heading from "../Heading";
import Card from "./partials/Card";
import Pagination from "../Pagination";
import {OfferContext} from "../../../context/offer-context";
import Search from "../Search";
import FormikSelect from "../form/select/FormikSelect";

class CardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      offers: [],
      page: props.currentPage,
      searchState: props.search,
      pageCount: 1,
      isLoading: false,
    };
    this.method = props.method;
    this.headingText = props.headingText;
    this.isCreator = props.isCreator;
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

    if ((!isLoading && !offers) || (!isLoading && pageCount === 0)) {
      return (
        <div className="all-offers wrapper">
          <Heading text={this.headingText}/>
          <Search/>
          <h5>No offers found!</h5>
        </div>
      )
    }

    return (
      <div className="all-offers wrapper">

        <Heading text={this.headingText}/>

        <Search ableRedirect={false}/>

        <FormikSelect/>

        <div className="card-list">
          {
            offers.map((offer) => (
              <Card key={offer._id} {...offer} isCreator={this.isCreator}/>
            ))
          }
        </div>

        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          update={updateOfferContext}/>

      </div>
    )
  }

  async componentDidUpdate(prevProps, prevState) {

    const {page, searchState} = this.state;
    const {sort, order} = this.props;
    const {currentPage, offersPerPage, search, filter} = this.context;

    if (currentPage !== page) {
      this.setState({
        page: currentPage,
      })
    }

    if (search !== searchState) {
      this.setState({
        searchState: search,
      })
    }

    if (prevState.page !== this.state.page || prevState.searchState !== search) {

      let res;
      this.isLoading = true;
      try {
        if (this.method === 'all') {
          res = await CardsContainer.service.getAllOffers(
            currentPage,
            offersPerPage,
            sort,
            order,
            search,
            filter);

          const pageCount = Math.ceil(Number(res.count) / offersPerPage);

          this.setState({
            offers: res.posts,
            pageCount: pageCount,
            isLoading: false,
          });
        }
      } catch (error) {
        this.setState({
          error: error.message,
          isLoading: false,
        })
      }
    }
  }

  async componentDidMount() {
    const {page, limit, sort, order} = this.props;
    const {currentPage, offersPerPage, updateOfferContext, search, filter} = this.context;

    if (page) {
      updateOfferContext('currentPage', Number(page));
    }

    if (limit) {
      updateOfferContext('offersPerPage', Number(limit));
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

      if (res.error) {
        const message = res.message + ' ' + res.error.message;
        throw new Error(message);
      }

      this.setState({
        offers: res.posts,
        pageCount: pageCount,
        searchState: this.context.search,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
      })
    }
  }
}

export default CardsContainer;
