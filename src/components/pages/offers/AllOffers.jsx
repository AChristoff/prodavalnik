import React, {useContext} from 'react';
import {useParams, useLocation } from "react-router-dom";
import CardsContainer from "../../shared/cards/CardsContainer";
import {OfferContext} from "../../../context/offer-context";
import {AuthContext} from "../../../context/user-context";


export default function AllOffers() {

  //Query params
  const params = useParams();
  const {pathname} = useLocation();

  // Context
  const {role} = useContext(AuthContext);
  const {currentPage, search} = useContext(OfferContext);

  const method = pathname === '/offers/approval' ? 'approval' : 'all';

  return (
    <CardsContainer
      method={method}
      headingText='Offers'
      currentPage={currentPage}
      isAdmin={role === 'Admin'}
      search={search}
      {...params}
    />
  )
}
