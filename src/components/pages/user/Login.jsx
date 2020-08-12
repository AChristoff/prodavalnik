import React, {useContext} from 'react';
import {NavLink, Redirect} from "react-router-dom";

import * as Yup from "yup";
import {Form, Formik} from 'formik';
import FormikField from "../../shared/form/FormikField";
import Button from "@material-ui/core/Button";
import Heading from "../../shared/Heading";
import AuthService from "../../../services/auth-service";
import {AuthContext} from "../../../context/user-context";
import {AlertContext} from "../../../context/alert-context";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email!')
    .required('Email is required!'),
  password: Yup.string()
    .min(6, 'Min 6 chars!')
    .max(40, 'Max 40 chars!')
    .required('Password is required!'),
});

export default function Login() {

  //Service
  const authService = new AuthService();

  const {isAuth, updateUserData} = useContext(AuthContext);
  const {updateAlertContext, counter} = useContext(AlertContext);

  const handleSubmit = async (values) => {

    try {
      const res = await authService.login(values);

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors
        }
        throw new Error(message);
      } else if (res.error) {

        updateAlertContext('errorContext', res.error.message);
        throw new Error(res.error.message);
      }

      window.localStorage.setItem('username', res.username);
      window.localStorage.setItem('role', res.role);
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('userId', res.userId);

      updateAlertContext('successContext', `Welcome, ${res.username}!`);

      updateUserData({
        isAuth: true,
        username: res.username,
        role: res.role,
      });

    } catch (error) {

      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  if (isAuth) {
    return (
      <Redirect to="/"/>
    );
  }

  return (
    <div className="wrapper login">

      <Heading text="Login"/>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
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
