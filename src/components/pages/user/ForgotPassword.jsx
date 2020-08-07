import React, {useState} from 'react';
import Heading from "../../shared/Heading";
import {Form, Formik} from "formik";
import FormikField from "../../shared/form/FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import AuthService from "../../../services/auth-service";
import Conditional from "../../shared/Conditional";
import Loading from "../../shared/Loading";

const forgoPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email!')
    .required('Email is required!'),
});

export default function ForgotPassword() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authService = new AuthService();

  const handleSubmit = async (values) => {

    setIsLoading(true);

    try {

      const res = await authService.forgotPassword(values);

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].param;
        if (errors && errors !== '') {
          message = errors
        }

        throw new Error(message);
      }

      setSuccess(res.message);
      setIsLoading(false);

    } catch (err) {

      setError(err.toString());
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading/>
  }

  if (success) {
    return (
      <div className="wrapper forgot-password">

        <Heading text="Forgot Your Password?"/>

        <Conditional if={success}>
          <h6 className='success-message'>{success}</h6>
        </Conditional>

      </div>
    );
  }

  return (
    <div className="wrapper forgot-password">

      <Heading text="Forgot Your Password?"/>

      <Conditional if={error.length}>
        <h6  className='error-message'>{error}</h6>
      </Conditional>

      <div className="forgot-password-from">

        <Formik
          initialValues={{email: ''}}
          validationSchema={forgoPasswordSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form className="register-from">

              <FormikField name="email" label="Email" placeholder="" icon="email"/>

              <Button fullWidth type="submit" variant="contained" size="large" color="primary" disabled={!props.isValid || !props.dirty}>
                Submit
              </Button>

            </Form>
          )}
        </Formik>

      </div>

    </div>
  );
}
