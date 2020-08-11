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
const alphanumericRegex = /^\w+$/;

const UserSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string(),
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
    .required('Required field!'),
  rePassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'New passwords do not match!')
    .required('New password confirmation is required!'),
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
    delete values.name;

    try {

      const res = await UserForm.service.editUser(values);

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors
        }
        throw new Error(message);
      } else if (res.error) {
        this.setState({
          error: res.error.message,
          success: '',
        });
        throw new Error(res.error.message);
      } else {

        this.setState({
          username: res.user.name,
          success: res.message,
          error: '',
        });
      }

      this.context.updateUserContext('username', res.user.name);
      window.localStorage.setItem('username', res.user.name);

      resetForm({name: this.context.username, password: '', newPassword: '', rePassword: ''});

    } catch (error) {

      this.setState({
        error: error.message,
        success: '',
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
          initialValues={{name: username, email, password: '', newPassword: '', rePassword: ''}}
          validationSchema={UserSchema}
          onSubmit={this.handleSubmit}
        >
          {(props) => (
            <Form className="user-from">

              <FormikField name="email" label="Email" icon="email" disabled={true}/>
              <FormikField required={true} name="name" label="Username" icon="username" disabled={true}/>
              <FormikField required={true} name="newPassword" label="New password" type="password" icon="password"/>
              <FormikField required={true} name="rePassword" label="Confirm your new password" type="password" icon="password"/>
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