import React, {useContext} from 'react';
import Heading from "../../../shared/Heading";
import OffersForm from "../../../shared/form/offers/OffersForm";
import OffersService from "../../../../services/offers-service";
import Loading from "../../../shared/Loading";
import {AlertContext} from "../../../../context/alert-context";

class EditOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: {},
      isLoading: true,
    };
    this.offerId = this.props.match.params.id
  }

  static service = new OffersService();
  static contextType = AlertContext;

  async componentDidMount() {

    const {updateAlertContext} = this.context;

    try {
      const res = await EditOffer.service.getOffer(this.offerId);

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors
        }
        throw new Error(message);
      } else if (res.error) {
        throw new Error(res.error.message);
      }

      this.setState({
        offer: res.post,
        isLoading: false,
      });

    } catch (error) {

      updateAlertContext('errorContext', error.message);
      this.setState({
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
      <div className="edit-offer wrapper">

        <Heading text="Edit offer"/>

        <OffersForm
          history={this.props.history}
          match={this.props.match}
          {...offer}
          updateAlertContext={updateAlertContext}
          errorCounter={counter}
          filterProp={offer.category}
          formType='edit'/>

      </div>
    );
  }
}

export default EditOffer;
