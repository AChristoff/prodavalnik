import React from 'react';
import Loading from "../../shared/Loading";
import Heading from "../../shared/Heading";
import UserOffers from "../../../services/user-service";
import UserForm from "../../shared/form/user/UserForm";

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

  async componentDidMount() {

    try {

      const user = await Profile.service.getUserDetails(this.userId);
      console.log(user.userDetails);
      this.setState({
        user: user.userDetails,
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
    const {user, isLoading} = this.state;

    if (isLoading) {
      return <Loading/>
    }

    return (
      <div className="user-details wrapper">

        <Heading text="User details"/>

        <UserForm username={user.name} email={user.email}/>

      </div>
    );
  }
}

export default Profile;