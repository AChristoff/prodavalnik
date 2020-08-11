import React from 'react';
import {Settings} from "@material-ui/icons";
import './code-error.scss'

export default function CodeError() {
  return (
    <div className="wrapper code-error">
      <Settings/>
      <h3>Something went wrong...</h3>
      <h5>We are working hard to fix it!</h5>
    </div>
  );
}
