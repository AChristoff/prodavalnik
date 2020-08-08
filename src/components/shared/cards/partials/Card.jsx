import React, {useContext, useState} from 'react';
import "./Card.scss"
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import SliceText from "../../slice-text/SliceText";
import SanitizedText from "../../SanitizedText";
import {Share, Star, StarBorder} from "@material-ui/icons";
import UserService from "../../../../services/user-service";
import Conditional from "../../Conditional";
import {OfferContext} from "../../../../context/offer-context";
import {AuthContext} from "../../../../context/user-context";

export default function Card({title, category, content, price, image, watched, _id, isCreator, method}) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = window.localStorage.getItem('userId');
  const [isFavorite, setIsFavorite] = useState(watched.includes(userId));
  const offersContext = useContext(OfferContext);
  const authContext = useContext(AuthContext);

  const userService = new UserService();

  const addFavoriteOffer = async (e) => {
    const parent = e.currentTarget.parentElement;

    try {

      const res = await userService.addFavoriteOffer({
        offerId: e.currentTarget.getAttribute('data-offer-id')
      });

      if (res.errors) {
        const message = res.message;
        throw new Error(message);
      }

      parent.classList.remove('not-added');
      parent.classList.add('added');

      setIsFavorite(true);
      setSuccess(res.message);

    } catch (error) {

      setError(error);
    }
  };

  const removeFavoriteOffer = async (e) => {

    const parent = e.currentTarget.parentElement;

    try {

      const res = await userService.removeFavoriteOffer({
        offerId: e.currentTarget.getAttribute('data-offer-id')
      });

      if (res.errors) {
        const message = res.message;
        throw new Error(message);
      }

      parent.classList.add('not-added');
      parent.classList.remove('added');

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
    <div className="site-card">

      <div className="card-head">
        <Link to={`/offers/view/${_id}`}>
          <img src={image} alt={title}/>
        </Link>
      </div>

      <div className="card-body">
        <SliceText
          text={title}
          tag="h6"
          length="19"
          className="card-heading"
          shade={false}
          isSanitized={true}/>
        <SanitizedText text={category}/>

        <section className="card-icons">

          <p className="price"><span>{price}</span> BGN</p>

          <Conditional if={authContext.isAuth}>
            {
              isFavorite
                ? <Star className="favorites added-offer" data-offer-id={_id} onClick={removeFavoriteOffer}/>
                : <StarBorder className="favorites not-added-offer" data-offer-id={_id} onClick={addFavoriteOffer}/>
            }
          </Conditional>

        </section>

        <br/>

        <SliceText text={content} isSanitized={true}/>

        <Link to={`/offers/view/${_id}`} className="view-btn">
          <Button
            fullWidth
            disableElevation
            variant="contained"
            size="large"
            color="primary"
          >
            View
          </Button>
        </Link>

        <Conditional if={isCreator}>

          <div className="edit-card">
            <Link to={`/offers/edit/${_id}`} className="btn-medium">
              <Button
                fullWidth
                disableElevation
                variant="contained"
                size="large"
                className="edit-btn btn-small"
              >
                Edit
              </Button>
            </Link>

            <Link to={`/offers/delete/${_id}`} className="btn-medium">
              <Button
                fullWidth
                disableElevation
                variant="contained"
                size="large"
                className="delete-btn"
              >
                Delete
              </Button>
            </Link>
          </div>

        </Conditional>

      </div>
    </div>
  )
}
