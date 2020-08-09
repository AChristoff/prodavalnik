import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import Heading from "../../../shared/Heading";
import OffersService from "../../../../services/offers-service";
import Loading from "../../../shared/Loading";
import Button from "@material-ui/core/Button";
import SanitizedText from "../../../shared/SanitizedText";


export default function ViewOffer() {

  //State
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //Query params
  const {id} = useParams();

  //History
  const history = useHistory();

  //Service
  const offersService = new OffersService();

  //Component did mount
  useEffect(() => {

    (async () => {

      try {
        const res = await offersService.getOffer(id);
        setOffer(res.post);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    })();

  }, []);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="view-offer wrapper">

      <Heading text="View offer"/>

      <div className="view-offer-img-wrapper">
        <img src={offer.image} alt={offer.title}/>
      </div>
      <SanitizedText tag="h5" text={offer.title}/>
      <SanitizedText text={offer.category}/>
      <SanitizedText text={offer.content}/>
      <p>{offer.price}</p>

      <div className="view-offer-back-btn">
        <Button
          fullWidth
          disableElevation
          variant="contained"
          size="large"
          color="primary"
          onClick={history.goBack}
        >
          Back
        </Button>
      </div>

    </div>
  );

}


/*class ViewOffer extends React.Component {
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

        <div className="view-offer-img-wrapper">
          <img src={offer.image} alt={offer.title}/>
        </div>
        <SanitizedText tag="h5" text={offer.title}/>
        <SanitizedText text={offer.category}/>
        <SanitizedText text={offer.content}/>
        <p>{offer.price}</p>

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

export default ViewOffer*/
