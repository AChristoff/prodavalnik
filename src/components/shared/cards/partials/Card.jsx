import React from 'react';
import "./Card.scss"
import Button from "@material-ui/core/Button";
import {Link, NavLink} from "react-router-dom";
import SliceText from "../../slice-text/SliceText";
import SanitizedText from "../../SanitizedText";

export default function Card({title, category, content, price, image, _id, isCreator}) {

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
