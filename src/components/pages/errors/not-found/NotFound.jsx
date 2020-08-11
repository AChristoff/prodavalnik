import React from 'react';
import {SentimentVeryDissatisfied} from "@material-ui/icons";
import './not-found.scss'

export default function NotFound() {
  return (
    <div className="wrapper not-found">
      <SentimentVeryDissatisfied/>
      <h3>Page not found !</h3>
      <p>The Page you are looking for doesn't exist!</p>
    </div>
  );
}


