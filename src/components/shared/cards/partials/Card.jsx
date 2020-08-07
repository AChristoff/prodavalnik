import React, {useState} from 'react';
import "./Card.scss"
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import SliceText from "../../slice-text/SliceText";
import SanitizedText from "../../SanitizedText";
import {Share, Star, StarBorder} from "@material-ui/icons";
import UserService from "../../../../services/user-service";

export default function Card({title, category, content, price, image, _id, isCreator}) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

      setSuccess(res.message);

    } catch (error) {

      console.log(error);
      setError(error);
    }
  };

  const removeFavoriteOffer = async (e) => {
    // const offerId = e.currentTarget.getAttribute('data-offer-id');
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
        <SanitizedText tag="h5" text={title}/>
        <SanitizedText text={category}/>

        <section className="card-icons not-added">

          <StarBorder className="favorites not-added-offer" data-offer-id={_id} onClick={addFavoriteOffer}/>
          <Star className="favorites added-offer" data-offer-id={_id} onClick={removeFavoriteOffer}/>

          <Share className="share-offer"/>
        </section>

        <br/>

        <SliceText text={content} isSanitized={true}/>

        <p className="price"><span>{price}</span> BGN</p>

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

        {
          isCreator

            ? <div className="edit-card">
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
            : null
        }

      </div>
    </div>
  )
}
