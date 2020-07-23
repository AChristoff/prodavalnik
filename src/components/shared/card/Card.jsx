import React from 'react';
import "./Card.scss"
import Button from "@material-ui/core/Button";

export default function Card({title, subtitle, content, price, image}) {
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
        <Button
          fullWidth
          disableElevation
          variant="contained"
          size="large"
          color="primary"
        >
          View
        </Button>
      </div>
    </div>
    )
}
