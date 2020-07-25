import React from 'react';
import Heading from "../../shared/Heading";
import OffersService from "../../../services/offers-service";
import Loading from "../../shared/Loading";

class ViewOffer extends React.Component {
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

      const offer = await ViewOffer.service.getOffer(this.offerId);

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
      <div className="view-offer wrapper">

        <Heading text="View offer"/>
        <img src={offer.image} alt={offer.title}/>
        <p>{offer.title}</p>
        <p>{offer.subtitle}</p>
        <p>{offer.content}</p>

      </div>
    );
  }
}

export default ViewOffer
