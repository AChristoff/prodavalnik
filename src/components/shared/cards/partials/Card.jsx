import React from 'react';
import "./Card.scss"
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export default function Card({title, subtitle, content, price, image, _id}) {
  return (
    <div className="site-card">

      <div className="card-head">
        <Link to={`/offers/view/${_id}`}>
          <img src={image} alt={title}/>
        </Link>
      </div>

      <div className="card-body">
        <h5>{title}</h5>
        <p>{subtitle}</p>
        <p>{content}</p>
        <p>{price}</p>

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

      </div>
    </div>
  )
}
