import React from 'react';
import {NavLink, Redirect} from "react-router-dom";

import * as Yup from "yup";
import {Form, Formik} from 'formik';
import FormikField from "../../shared/form/FormikField";
import Button from "@material-ui/core/Button";
import Heading from "../../shared/Heading";
import AuthService from "../../../services/auth-service";
import {AuthContext} from "../../../context/user-context";


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
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  static service = new AuthService();
  static contextType = AuthContext;

  handleSubmit = (values) => {
    const {updateUserData} = this.context;

    this.setState({
      error: '',
    }, async () => {
      try {
        const res = await Login.service.login(values);

        if (res.errors) {
          const message = res.message;
          throw new Error(message);
        }

        window.localStorage.setItem('username', res.username);
        window.localStorage.setItem('role', res.role);
        window.localStorage.setItem('token', res.token);
        window.localStorage.setItem('userId', res.userId);

        updateUserData({
          isAuth: true,
          username: res.username,
          role: res.role,
        });

      } catch (error) {

        this.setState({
          error: error.message,
        })
      }
    });
  };

  render() {
    const {isAuth} = this.context;

    if (isAuth) {
      return (
        <Redirect to="/"/>
      );
    }

    return (
      <div className="wrapper login">

        {/* TODO: toaster component*/}
        {this.state.error.length ? <div className="error-message">Error: {this.state.error}</div> : null}

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

              <Button fullWidth type="submit" variant="contained" size="large" color="primary" disabled={!props.isValid || !props.dirty}>
                Login
              </Button>

            </Form>
          )}
        </Formik>

        <div className="login-addons">
          <NavLink className="go-to-register" to="/user/register" exact>
            Don't have an account? Register now!
          </NavLink>

          <NavLink className="go-to-register" to="/user/forgot-password" exact>
            Forgot your password?
          </NavLink>
        </div>

      </div>
    );
  }
}

export default Login;
