import React from 'react';
import {Form, Formik} from "formik";
import FormikField from "../FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import UserOffers from "../../../../services/user-service";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialRegex = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/;

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
      success: '',
      error: '',
    };
  }

  static service = new UserOffers();

  handleSubmit = async (values) => {
    const {updateAlertContext, counter, history} = this.props;

    const userData = { ...values };
    delete userData.rePassword;
    delete userData.name;

    try {

      const res = await UserForm.service.editUser(userData);

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

      updateAlertContext('successContext', `Your password was changed successfully!`);
      history.push('/user/offers');

    } catch (error) {

      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  render() {

    const {email, username} = this.props;

    return (

      <div className="user-details-form">

        <Formik
          initialValues={{name: username || '', email: email || '', password: '', newPassword: '', rePassword: ''}}
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