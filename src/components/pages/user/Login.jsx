import React, {isValidElement} from 'react';

import * as Yup from "yup";
import {Form, Formik} from 'formik';
import FormikField from "../../shared/form/FormikField";
import Button from "@material-ui/core/Button";

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

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="wrapper login">
      <h3>Login</h3>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
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
