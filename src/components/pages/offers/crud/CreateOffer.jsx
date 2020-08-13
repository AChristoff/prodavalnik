import React from 'react';

import Heading from "../../../shared/Heading";
import OffersForm from "../../../shared/form/offers/OffersForm";
import {AlertContext} from "../../../../context/alert-context";

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  static contextType = AlertContext;

  render() {
    const {updateAlertContext, counter} = this.context;
    return (
      <div className="create-offer wrapper">

        <Heading text="Add Offer"/>

        <OffersForm
          history={this.props.history}
          match={this.props.match}
          updateAlertContext={updateAlertContext}
          errorCounter={counter}
          formType='add'/>

      </div>
    );
  }
}

export default CreateOffer;
