import React from 'react';
import {Star, StarBorder} from "@material-ui/icons";
import Conditional from "../Conditional";
import './favorites.scss'

export default function Favorite() {
  return (
    <Conditional if={authContext.isAuth}>
      {
        isFavorite
          ? <Star className="favorites added-offer" data-offer-id={_id} onClick={removeFavoriteOffer}/>
          : <StarBorder className="favorites not-added-offer" data-offer-id={_id} onClick={addFavoriteOffer}/>
      }
    </Conditional>
  );
}
