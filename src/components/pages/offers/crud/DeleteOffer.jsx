import React from 'react';
import Heading from "../../../shared/Heading";
import OffersService from "../../../../services/offers-service";
import Loading from "../../../shared/Loading";
import OffersForm from "../../../shared/form/offers/OffersForm";
import {AlertContext} from "../../../../context/alert-context";

class DeleteOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      offer: {},
      isLoading: true,
    };
    this.offerId = this.props.match.params.id
  }

  static service = new OffersService();
  static contextType = AlertContext;

  async componentDidMount() {

    try {

      const offer = await DeleteOffer.service.getOffer(this.offerId);

      this.setState({
        offer: offer.post,
        isLoading: false,
      });

    } catch (error) {

      this.setState({
        error: error.message,
        isLoading: false,
      });

    }
  };

  render() {
    const {offer, isLoading} = this.state;
    const {updateAlertContext, counter} = this.context;

    if (isLoading) {
      return <Loading/>
    }

    return (
      <div className="delete-offer wrapper">

        <Heading text="Delete offer"/>

        <OffersForm
          history={this.props.history}
          match={this.props.match}
          filterProp={offer.category}
          {...offer}
          updateAlertContext={updateAlertContext}
          errorCounter={counter}
          formType='delete'/>

      </div>
    );
  }
}

export default DeleteOffer;
