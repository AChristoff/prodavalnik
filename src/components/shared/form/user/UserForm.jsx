import React from 'react';
import {Form, Formik} from "formik";
import FormikField from "../FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import UserOffers from "../../../../services/user-service";
import {AuthContext} from "../../../../context/user-context";
import Conditional from "../../Conditional";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialRegex = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/;
const letterRegex = /^[A-Za-z]+$/;

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Username must be at least 2 characters!')
    .max(20, 'Username must be maximum 20 characters!')
    .matches(letterRegex, 'Username must contain only letters!')
    .required('Username is required!'),
  email: Yup.string()
    .email('Invalid email!')
    .required('Email is required!'),
  password: Yup.string()
    .min(6, 'Min 6 chars!')
    .max(40, 'Max 40 chars!')
    .matches(lowercaseRegex, 'One lowercase required')
    .matches(uppercaseRegex, 'One uppercase required')
    .matches(numericRegex, 'One number required')
    .matches(specialRegex, 'One special character required')
    .required('Password is required!'),
  newPassword: Yup.string()
    .min(6, 'Min 6 chars!')
    .max(40, 'Max 40 chars!')
    .matches(lowercaseRegex, 'One lowercase required')
    .matches(uppercaseRegex, 'One uppercase required')
    .matches(numericRegex, 'One number required')
    .matches(specialRegex, 'One special character required')
});


class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      success: '',
      error: '',
    };
  }

  static service = new UserOffers();
  static contextType = AuthContext;

  handleSubmit = async (values, {resetForm}) => {
    delete values.rePassword;

    try {
      const res = await UserForm.service.editUser(values);

      console.log(res);

      if (res.errors) {

        const message = res.message;
        throw new Error(message);
      }


      this.setState({
        username: res.user.name,
        success: res.message,
        error: '',
      });

      resetForm({password: '', newPassword: ''});

      window.localStorage.setItem('username', res.user.name);
      this.context.updateUserContext('username', res.user.name);

    } catch (error) {

      this.setState({
        error: error.message,
      })
    }
  };

  render() {

    const {email} = this.props;
    const {username, success, error} = this.state;

    return (

      <div className="user-details-form">

        <Conditional if={error.length}>
          <div className='error-message'>Error: {error}</div>
        </Conditional>

        <Conditional if={success}>
          <div className='success-message'>{success}</div>
        </Conditional>

        <Formik
          initialValues={{name: username, email, password: '', newPassword: ''}}
          validationSchema={UserSchema}
          onSubmit={this.handleSubmit}
        >
          {(props) => (
            <Form className="user-from">

              <FormikField name="email" label="Email" icon="email" disabled={true}/>
              <FormikField required={true} name="name" label="Username" icon="username"/>
              <FormikField name="newPassword" label="New password" type="password" icon="password"/>
              <FormikField required={true} name="password" label="Your password" type="password" icon="password" className="new-password"/>

              <Button fullWidth type="submit" variant="contained" size="large" color="primary" disabled={!props.isValid || !props.dirty}>
                Change your details
              </Button>

            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default UserForm;