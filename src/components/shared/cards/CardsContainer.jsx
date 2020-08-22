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
import SnackbarAlert from "../snackbar/Snackbar";

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
      isLoading: true,
      favoritesChange: props.favoritesChange,
      noOffers: false,
    };
    this.method = props.method;
    this.headingText = props.headingText;
    this.isCreator = props.isCreator;
    this.isAdmin = props.isAdmin;
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
    const {offers, isLoading, pageCount, error, noOffers} = this.state;
    const {currentPage, updateOfferContext} = this.context;

    if (isLoading) {
      return <Loading/>
    }

    return (
      <div className="all-offers wrapper">

        <Conditional if={error.length}>
          <SnackbarAlert typeProp="error" messageProp={error} isOpen={true}/>
        </Conditional>

        <Heading text={this.headingText}/>

        <Conditional if={method !== 'user'}>
          <section className="search-and-filters">

            <Search ableRedirect={false}/>
            <FormikSelect name="category" label="Category" changeContext={true}/>

          </section>
        </Conditional>

        {noOffers
          ? <h5>No offers found!</h5>
          :<div className="card-list">
            {
              offers.map((offer) => (
                <Card
                  key={offer._id}
                  {...offer}
                  isCreator={this.isCreator}
                  isAdmin={this.isAdmin}
                  method={method}
                />
              ))
            }
          </div>
        }

        <Conditional if={method !== 'user' && !noOffers}>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            update={updateOfferContext}/>
        </Conditional>

      </div>
    )
  }

  async componentDidUpdate(prevProps, prevState) {

    let {page, searchState, filterState, favoritesChange} = this.state;;
    const {sort, order} = this.props;
    const {currentPage, offersPerPage, search, filter, updateOfferContext, favoritesContext} = this.context;

    if (currentPage !== page) {
      this.setState({
        page: currentPage,
      })
    }

    if (favoritesContext !== favoritesChange) {
      this.setState({
        favoritesChange: favoritesContext,
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
      || prevState.searchState !== search
      || prevState.favoritesChange !== favoritesChange) {

      this.setState({
        isLoading: true,
      });
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
        } else if (this.method === 'approval') {
          res = await CardsContainer.service.getOffersForApproval(
            currentPage,
            offersPerPage,
            sort,
            order,
            search,
            filter);
        } else if (this.method === 'user') {
          res = await CardsContainer.service.getUserOffers();
        } else if (this.method === 'favorites') {
          res = await CardsContainer.service.getFavoriteOffers(
            currentPage,
            offersPerPage,
            sort,
            order,
            search,
            filter);
        }

        const pageCount = Math.ceil(Number(res.count) / offersPerPage);

        this.setState({
          offers: res.posts,
          pageCount: pageCount,
          isLoading: false,
        });

      
        this.setState({
          noOffers: res.posts.length === 0,
        });
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

    this.setState({
      isLoading: true,
    });
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
      } else if (this.method === 'approval') {
        res = await CardsContainer.service.getOffersForApproval(
          currentPage,
          offersPerPage,
          sort,
          order,
          search,
          filter);
      } else if (this.method === 'user') {
        res = await CardsContainer.service.getUserOffers();
      } else if (this.method === 'favorites') {
        res = await CardsContainer.service.getFavoriteOffers(
          currentPage,
          offersPerPage,
          sort,
          order,
          search,
          filter
        );
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

      
        this.setState({
          noOffers: res.posts.length === 0
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
