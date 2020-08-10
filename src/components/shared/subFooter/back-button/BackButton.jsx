import React from 'react';
import './backButton.scss'
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {ArrowBackIos} from "@material-ui/icons";

export default function BackButton() {
  const history = useHistory();

  return (
    <div className="back-btn">
      <Button
        fullWidth
        disableElevation
        variant="contained"
        size="large"
        color="primary"
        onClick={history.goBack}
      >
        <ArrowBackIos/> Back
      </Button>
    </div>
  );
}
