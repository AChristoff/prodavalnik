import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import CardsContainer from "../../shared/cards/CardsContainer";
import {OfferContext} from "../../../context/offer-context";
import {AuthContext} from "../../../context/user-context";


export default function AllOffers() {

  //Query params
  const params = useParams();

  // Context
  const {role} = useContext(AuthContext);
  const {currentPage, search} = useContext(OfferContext);

  return (
    <CardsContainer
      method='all'
      headingText='Offers'
      currentPage={currentPage}
      isAdmin={role === 'Admin'}
      search={search}
      {...params}
    />
  )
}
