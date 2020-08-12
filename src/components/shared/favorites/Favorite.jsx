import React, {useContext, useEffect, useState} from 'react';
import {Star, StarBorder} from "@material-ui/icons";
import Conditional from "../Conditional";
import './favorites.scss'
import {OfferContext} from "../../../context/offer-context";
import {AuthContext} from "../../../context/user-context";
import UserService from "../../../services/user-service";
import {AlertContext} from "../../../context/alert-context";

export default function Favorite({method, watched, offerId}) {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = window.localStorage.getItem('userId');
  const [isFavorite, setIsFavorite] = useState([watched.includes(userId)]);
  const offersContext = useContext(OfferContext);
  const authContext = useContext(AuthContext);
  const {updateAlertContext} = useContext(AlertContext);

  //Component did mount
  useEffect(() => {
    setIsFavorite(watched.includes(userId))
  }, []);

  const userService = new UserService();

  const addFavoriteOffer = async (e) => {

    try {

      const res = await userService.addFavoriteOffer({
        offerId: e.currentTarget.getAttribute('data-offer-id')
      });

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors
        }
        updateAlertContext('errorContext', message);
        throw new Error(message);
      } else if (res.error) {
        updateAlertContext('errorContext', res.error.message);
        throw new Error(res.error.message);
      } else {
        updateAlertContext('successContext', res.message);
      }

      setIsFavorite(true);
      setSuccess(res.message);

    } catch (error) {

      setError(error);
    }
  };

  const removeFavoriteOffer = async (e) => {

    try {

      const res = await userService.removeFavoriteOffer({
        offerId: e.currentTarget.getAttribute('data-offer-id')
      });

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors
        }
        updateAlertContext('errorContext', message);
        throw new Error(message);
      } else if (res.error) {
        updateAlertContext('errorContext', res.error.message);
        throw new Error(res.error.message);
      } else {
        updateAlertContext('successContext', res.message);
      }

      if (method === 'favorites') {
        offersContext.updateOfferContext('favoritesContext', offersContext.favoritesContext + 1);
      }

      setIsFavorite(false);
      setSuccess(res.message);

    } catch (error) {

      setError(error);
    }
  };

  return (
    <Conditional if={authContext.isAuth}>
      {
        isFavorite
          ? <Star className="favorites added-offer" data-offer-id={offerId} onClick={removeFavoriteOffer}/>
          : <StarBorder className="favorites not-added-offer" data-offer-id={offerId} onClick={addFavoriteOffer}/>
      }
    </Conditional>
  );
}
