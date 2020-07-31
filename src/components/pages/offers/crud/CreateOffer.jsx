import React from 'react';

import Heading from "../../../shared/Heading";
import OffersForm from "../../../shared/form/offers/OffersForm";
import {OfferContext} from "../../../../context/offer-context";

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  static contextType = OfferContext;

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
