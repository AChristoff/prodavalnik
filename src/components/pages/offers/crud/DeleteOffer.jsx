import React from 'react';
import Heading from "../../../shared/Heading";
import Button from "@material-ui/core/Button";

class DeleteOffer extends React.Component {
  render()
  {
    return (
      <div className="delete-offer wrapper">

        <Heading text="Delete offer"/>

        <div className="view-offer-back-btn">
          <Button
            fullWidth
            disableElevation
            variant="contained"
            size="large"
            color="primary"
            onClick={this.props.history.goBack}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
}

export default DeleteOffer;
