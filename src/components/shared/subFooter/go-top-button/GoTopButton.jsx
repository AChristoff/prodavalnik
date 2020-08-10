import React from 'react';
import Button from "@material-ui/core/Button";
import {KeyboardArrowUp} from "@material-ui/icons";
import './goTopButton.scss'

export default function goTopButton() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="go-top-btn">
      <Button
        fullWidth
        disableElevation
        variant="contained"
        size="large"
        color="primary"
        onClick={scrollToTop}
      >
        <KeyboardArrowUp/>Top
      </Button>
    </div>
  );
}
