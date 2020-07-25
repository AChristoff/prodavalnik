import React from 'react';
import "./Card.scss"
import Button from "@material-ui/core/Button";
import {Link, NavLink} from "react-router-dom";
import SliceText from "../../slice-text/SliceText";

export default function Card({title, subtitle, content, price, image, _id, isCreator}) {

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
        <SliceText text={content}/>

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

            ? <div>
              <Link to={`/offers/edit/${_id}`} className="view-btn">
                <Button
                  fullWidth
                  disableElevation
                  variant="contained"
                  size="large"
                  className="edit-btn"
                >
                  Edit
                </Button>
              </Link>

              <Link to={`/offers/delete/${_id}`} className="view-btn">
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
