import React from 'react';
import Heading from "../../../shared/Heading";
import Button from "@material-ui/core/Button";
import OffersForm from "../../../shared/form/offers/OffersForm";
import OffersService from "../../../../services/offers-service";
import Loading from "../../../shared/Loading";

class EditOffer extends React.Component {
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

  async componentDidMount() {

    try {

      const offer = await EditOffer.service.getOffer(this.offerId);

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
          isEdit={true}/>

      </div>
    );
  }
}

export default EditOffer;
