import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import OffersService from '../../../services/offers-service';
import Loading from '../Loading';
import Heading from '../Heading';
import Card from './partials/Card';
import Pagination from '../Pagination';
import { OfferContext } from '../../../context/offer-context';
import { AlertContext } from '../../../context/alert-context';
import Search from '../Search';
import FormikSelect from '../form/select/FormikSelect';
import Conditional from '../Conditional';

export default function CardsContainer({
  method,
  headingText,
  isCreator,
  isAdmin,
}) {
  
  //Query params
  const { limit, sort, order } = useParams();

  //Context
  const {
    search,
    filter,
    currentPage,
    offersPerPage,
    updateOfferContext,
    favoritesContext,
  } = useContext(OfferContext);
  
  const { updateAlertContext } = useContext(AlertContext);

  //State
  const [offers, setOffers] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [noOffers, setNoOffers] = useState(false);

  //Service
  const offersService = new OffersService();

  //Component did update
  useEffect(() => {
    updateComponent(currentPage);
  }, [currentPage, favoritesContext]);

  useEffect(() => {
    updateOfferContext('currentPage', 1)
    updateComponent(1);
  }, [search, filter]);

  const updateComponent = (page) => {
    (async () => {
      let res;

      try {
        if (method === 'all') {
          res = await offersService.getAllOffers(
            page,
            offersPerPage,
            sort,
            order,
            search,
            filter
          );
        } else if (method === 'approval') {
          res = await offersService.getOffersForApproval(
            page,
            offersPerPage,
            sort,
            order,
            search,
            filter
          );
        } else if (method === 'user') {
          res = await offersService.getUserOffers();
        } else if (method === 'favorites') {
          res = await offersService.getFavoriteOffers(
            page,
            offersPerPage,
            sort,
            order,
            search,
            filter
          );
        }

        const pageCount = Math.ceil(Number(res.count) / offersPerPage);

        if (res.errors) {
          let message = res.message;
          const errors = res.errors[0].msg;
          if (errors && errors !== '') {
            message = errors;
          }
          throw new Error(message);
        } else if (res.error) {
          throw new Error(res.error.message);
        }

        setOffers(res.posts);
        setPageCount(pageCount);
        setIsLoading(false);
        setNoOffers(res.posts.length === 0);
      } catch (error) {
        setIsLoading(false);
        updateAlertContext('errorContext', error.message);
      }
    })();

    if (limit) {
      updateOfferContext('offersPerPage', Number(limit));
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="all-offers wrapper">
      <Heading text={headingText} />

      <Conditional if={method !== 'user'}>
        <section className="search-and-filters">
          <Search ableRedirect={false} />
          <FormikSelect name="category" label="Category" changeContext={true} />
        </section>
      </Conditional>

      {noOffers ? (
        <h5>No offers found!</h5>
      ) : (
        <div className="card-list">
          {
            offers.map((offer) => (
            <Card
              key={offer._id}
              {...offer}
              isCreator={isCreator}
              isAdmin={isAdmin}
              method={method}
            />
          ))
          }
        </div>
      )}

      <Conditional if={method !== 'user' && !noOffers}>
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          update={updateOfferContext}
        />
      </Conditional>
    </div>
  );
}
