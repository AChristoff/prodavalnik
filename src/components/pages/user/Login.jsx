import React from 'react';
import {Redirect} from "react-router-dom";

import * as Yup from "yup";
import {Form, Formik} from 'formik';
import FormikField from "../../shared/form/FormikField";
import Button from "@material-ui/core/Button";
import Heading from "../../shared/Heading";
import AuthService from "../../../services/auth-service";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email!')
    .required('Email is required!'),
  password: Yup.string()
    .min(6, 'Min 6 chars!')
    .max(40, 'Max 40 chars!')
    .required('Password is required!'),
});

class Login extends React.Component {
  static service = new AuthService();

  state = {
    isAuth: false,
    error: '',
  };

  handleSubmit = (values) => {
    console.log(values);

    this.setState({
      error: '',
    }, async () => {
      try {
        const credentials = await Login.service.login(values);
        console.log(credentials);
        this.setState({
          isAuth: true,
        });
      } catch (error) {
        console.log(error);
        this.setState({
          error: error.message,
        })
      }
    });
  };

  render() {

    if (this.state.isAuth) {
      return (
        <Redirect to="/"/>
      );
    }

    return (
      <div className="wrapper login">

        {/* TODO: create toastr component */}
        {/*{ this.error.length ? <div>Something went wrong: {this.error}</div> : null }*/}

        <Heading text="Login"/>

        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={this.handleSubmit}
        >
          {(props) => (
            <Form className="login-from">

              <FormikField name="email" label="Email" icon="email"/>
              <FormikField name="password" label="Password" type="password" icon="password"/>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                disabled={!props.isValid || !props.dirty}
              >
                Login
              </Button>

            </Form>
          )}
        </Formik>

      </div>
    );
  }
}

export default Login;
