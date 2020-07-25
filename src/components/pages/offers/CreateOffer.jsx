import React from 'react';
import Heading from "../../shared/Heading";
import Button from "@material-ui/core/Button";

class CreateOffer extends React.Component {

  render() {
    return (
      <div className="create-offer wrapper">

        <Heading text="Create Offer"/>

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

export default CreateOffer;
