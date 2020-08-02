import React from 'react';
import {Form, Formik} from "formik";
import FormikField from "../FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";

const letterRegex = /^[A-Za-z]+$/;

const UserSchema = Yup.object().shape({
  username: Yup.string()
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
    .required('Password is required!'),
  newPassword: Yup.string()
    .min(6, 'Min 6 chars!')
    .max(40, 'Max 40 chars!'),
  rePassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'New passwords do not match!')
});



class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  handleSubmit = () => {
    console.log('hi');

  };

  render() {

    const {username, email} = this.props;

    return (
      <Formik
        initialValues={{username, email, password: '', newPassword: '', rePassword: ''}}
        validationSchema={UserSchema}
        onSubmit={this.handleSubmit}
      >
        {(props) => (
          <Form className="user-from">

            <FormikField name="username" label="Username" icon="username"/>
            <FormikField name="email" label="Email" icon="email"/>
            <FormikField name="password" label="Password" type="password" icon="password"/>

            <FormikField name="newPassword" label="New password" type="password" placeholder="Ex. John#567" icon="password" className="new-password"/>
            <FormikField name="rePassword" label="Confirm new password" type="password" icon="password"/>

            <Button fullWidth type="submit" variant="contained" size="large" color="primary" disabled={!props.isValid || !props.dirty}>
              Change your details
            </Button>

          </Form>
        )}
      </Formik>
    );
  }
}

export default UserForm;