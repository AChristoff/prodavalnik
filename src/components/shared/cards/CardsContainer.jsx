import React from 'react';

import OffersService from "../../../services/offers-service";
import Loading from "../Loading";
import Heading from "../Heading";
import Card from "./partials/Card";
import Pagination from "../Pagination";
import {OfferContext} from "../../../context/offer-context";
import Search from "../Search";
import FormikSelect from "../form/select/FormikSelect";
import Conditional from "../Conditional";

class CardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      offers: [],
      page: props.currentPage,
      searchState: props.search,
      filterState: props.filter,
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
    const {method} = this.props;
    const {offers, isLoading, pageCount, error} = this.state;
    const {currentPage, updateOfferContext} = this.context;
    const categoryItems = [
      {
        value: '',
        category: 'All categories',
      },
      {
        value: 'Vehicles',
        category: 'Vehicles',
      },
      {
        value: 'Electronics & Appliances',
        category: 'Electronics & Appliances',
      },
      {
        value: 'Furniture & Decor',
        category: 'Furniture & Decor',
      },
      {
        value: 'Fashion & Beauty',
        category: 'Fashion & Beauty',
      },
      {
        value: 'Pets',
        category: 'Pets',
      },
      {
        value: 'Sports & Equipment',
        category: 'Sports & Equipment',
      },
      {
        value: 'Machines & Tools',
        category: 'Machines & Tools',
      },
      {
        value: 'Art & Books',
        category: 'Art & Books',
      },
      {
        value: 'Antiques',
        category: 'Antiques',
      },
    ];

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

    const noOffers = (!isLoading && !offers) || (!isLoading && pageCount === 0);

    return (
      <div className="all-offers wrapper">


        <Heading text={this.headingText}/>

        <Conditional if={method === 'all'}>
          <section className="search-and-filters">

            <Search ableRedirect={false}/>
            <FormikSelect name="category" label="Category" items={categoryItems}/>

          </section>
        </Conditional>

        <Conditional if={noOffers}>
          <h5>No offers found!</h5>
        </Conditional>

        <Conditional if={!noOffers}>
          <div className="card-list">
            {
              offers.map((offer) => (
                <Card key={offer._id} {...offer} isCreator={this.isCreator}/>
              ))
            }
          </div>
        </Conditional>

        <Conditional if={method === 'all' && !noOffers}>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            update={updateOfferContext}/>
        </Conditional>

      </div>
    )
  }

  async componentDidUpdate(prevProps, prevState) {

    const {page, searchState, filterState} = this.state;
    const {sort, order} = this.props;
    const {currentPage, offersPerPage, search, filter, updateOfferContext} = this.context;

    if (currentPage !== page) {
      this.setState({
        page: currentPage,
      })
    }

    if (search !== searchState) {
      this.setState({
        searchState: search,
      });
      updateOfferContext('currentPage', 1);
    }

    if (filter !== filterState) {
      this.setState({
        filterState: filter,
      });
      updateOfferContext('currentPage', 1);
    }

    if (prevState.page !== this.state.page
      || prevState.filterState !== filter
      || prevState.searchState !== search) {

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
