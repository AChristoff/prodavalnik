import React from 'react';

import Heading from "../../../shared/Heading";
import OffersForm from "../../../shared/form/offers/OffersForm";

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  render() {
    return (
      <div className="create-offer wrapper">

        <Heading text="Create Offer"/>

        <OffersForm history={this.props.history} match={this.props.match} formType='create'/>

      </div>
    );
  }
}

export default CreateOffer;
