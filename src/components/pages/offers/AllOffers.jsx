import React, {useContext} from 'react';
import {useParams, useLocation } from "react-router-dom";
import CardsContainer from "../../shared/cards/CardsContainer";
import {AuthContext} from "../../../context/user-context";


export default function AllOffers() {

  
  const {pathname} = useLocation();

  // Context
  const {role} = useContext(AuthContext);

  const method = pathname === '/offers/approval' ? 'approval' : 'all';
  const headingText = pathname === '/offers/approval' ? 'Offers pending approval' : 'Offers';

  return (
    <CardsContainer
      method={method}
      headingText={headingText}
      isAdmin={role === 'Admin'}
    />
  )
}
