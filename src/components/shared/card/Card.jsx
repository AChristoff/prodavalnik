import React from 'react';
import "./Card.scss"
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

export default function Card({title, subtitle, content, price, image, _id}) {
  return (
    <div className="site-card">
      <div className="card-head">
        <img src={image} alt={title}/>
      </div>
      <div className="card-body">
        <h5>{title}</h5>
        <p>{subtitle}</p>
        <p>{content}</p>
        <p>{price}</p>

        <NavLink to={`/offers/view/${_id}`} className="view-btn">
          <Button
            fullWidth
            disableElevation
            variant="contained"
            size="large"
            color="primary"
          >
            View
          </Button>
        </NavLink>

      </div>
    </div>
  )
}
