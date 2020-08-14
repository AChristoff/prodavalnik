import React from 'react';
import Loading from "../../shared/Loading";
import Heading from "../../shared/Heading";
import UserOffers from "../../../services/user-service";
import UserForm from "../../shared/form/user/UserForm";
import {AlertContext} from "../../../context/alert-context";
import OffersForm from "../../shared/form/offers/OffersForm";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      user: {},
      isLoading: true,
    };
    this.userId = window.localStorage.getItem('userId')
  }

  static service = new UserOffers();
  static contextType = AlertContext;

  async componentDidMount() {
    const {updateAlertContext} = this.context;

    try {

      const user = await Profile.service.getUserDetails(this.userId);

      this.setState({
        user: user.userDetails,
        isLoading: false,
      });

    } catch (error) {

      updateAlertContext('errorContext', error.message);
      this.setState({
        error: error.message,
        isLoading: false,
      });
    }
  };

  render() {
    const {user, isLoading} = this.state;
    const {updateAlertContext, counter} = this.context;

    if (isLoading) {
      return <Loading/>
    }

    return (
      <div className="user-details wrapper">

        <Heading text="Your details"/>

        <UserForm
          username={user.name}
          email={user.email}
          updateAlertContext={updateAlertContext}
          errorCounter={counter}
          history={this.props.history}
        />

      </div>
    );
  }
}

export default Profile;