import React, {useContext, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import AuthService from "../../../services/auth-service";
import {AuthContext} from "../../../context/user-context";
import Loading from "../../shared/Loading";
import Heading from "../../shared/Heading";
import Conditional from "../../shared/Conditional";
import {Form, Formik} from "formik";
import FormikField from "../../shared/form/FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialRegex = /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`])/;

const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Minimum 6 character required!')
    .max(40, 'Maximum 40 character!')
    .matches(lowercaseRegex, 'One lowercase required')
    .matches(uppercaseRegex, 'One uppercase required')
    .matches(numericRegex, 'One number required')
    .matches(specialRegex, 'One special character required')
    .required('Password is required!'),
  rePassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match!')
    .required('Password confirmation is required!'),
});

export default function ResetPassword() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(AuthContext);
  const params = useParams();
  const [token, setToken] = useState(params.token);

  const authService = new AuthService();
  console.log(token);

  const handleSubmit = async (values) => {
    delete values.rePassword;

    setIsLoading(true);

    try {

      const res = await authService.resetPassword(values, token);

      if (res.errors) {
        let message = res.message;
        throw new Error(message);
      }

      console.log(res);
      window.localStorage.setItem('username', res.username);
      window.localStorage.setItem('role', res.role);
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('userId', res.userId);

      context.updateUserData({
        isAuth: true,
        username: res.username,
        role: res.role,
      });

      setSuccess(res.message);
      setIsLoading(false);

    } catch (error) {

      setError(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading/>
  }

  if (success) {
    return (
      <Redirect to="/"/>
    );
  }

  return (
    <div className="wrapper reset-password">

      <Heading text="Reset Password"/>

      <Conditional if={error.length}>
        <h6 className='error-message'>{error}</h6>
      </Conditional>

      <Conditional if={success}>
        <h6 className='success-message'>{success}</h6>
      </Conditional>

        <Formik
          initialValues={{ newPassword: '', rePassword: ''}}
          validationSchema={resetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form className="reset-password-from">


              <FormikField name="newPassword" label="Password" type="password" placeholder="Ex. John#567" icon="password"/>
              <FormikField name="rePassword" label="Confirm Password" type="password" icon="password"/>

              <Button fullWidth type="submit" variant="contained" size="large" color="primary" disabled={!props.isValid || !props.dirty}>
                Reset
              </Button>

            </Form>
          )}
        </Formik>

    </div>
  );
}
