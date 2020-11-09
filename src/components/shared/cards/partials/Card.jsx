import React from 'react';
import "./Card.scss"
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import SliceText from "../../slice-text/SliceText";
import SanitizedText from "../../SanitizedText";
import Conditional from "../../Conditional";
import Favorite from "../../favorites/Favorite";
import OfferStatus from "../../offer-status/OfferStatus";

function Card(
  {
    title,
    category,
    content,
    price,
    image,
    watched,
    approval,
    _id,
    isCreator,
    isAdmin,
    method
  }) {

  return (
    <div className="site-card">
      <div className="card-head">
        <Link to={`/offers/view/${_id}`}>
          <img src={`${process.env.REACT_APP_API}/${image}`} alt={title}/>
        </Link>
      </div>

      <div className="card-body">
        <SliceText text={title} tag="h6" length="19" className="card-heading" shade={false} isSanitized={true} />
        <SanitizedText text={category.name} />

        <section className="card-icons">
          <p className="price">
            <span>{price}</span> BGN
          </p>
          <section>
            <Favorite method={method} watched={watched} offerId={_id} />

            <Conditional if={isAdmin || isCreator}>
              <OfferStatus offerId={_id} approval={approval} />
            </Conditional>
          </section>
        </section>

        <SliceText text={content} isSanitized={true} />

        <Link to={`/offers/view/${_id}`} className="view-btn">
          <Button fullWidth disableElevation variant="contained" size="large" color="primary">
            View
          </Button>
        </Link>

        <Conditional if={isCreator || isAdmin}>
          <div className="edit-card">
            <Link to={`/offers/edit/${_id}`} className="btn-medium">
              <Button fullWidth disableElevation variant="contained" size="large" className="edit-btn btn-small">
                Edit
              </Button>
            </Link>

            <Link to={`/offers/delete/${_id}`} className="btn-medium">
              <Button fullWidth disableElevation variant="contained" size="large" className="delete-btn">
                Delete
              </Button>
            </Link>
          </div>
        </Conditional>
      </div>
    </div>
  );
}

export default Card;