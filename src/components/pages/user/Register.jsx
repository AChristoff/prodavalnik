import React from 'react';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import FormikField from "../../shared/form/FormikField";
import Heading from "../../shared/Heading";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialRegex = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/;
const letterRegex = /^[A-Za-z]+$/;

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username must be at least 2 characters!')
    .max(20, 'Username must be maximum 20 characters!')
    .matches(letterRegex, 'Username must contain only letters!')
    .required('Username is required!'),
  email: Yup.string()
    .email('Invalid email!')
    .required('Email is required!'),
  password: Yup.string()
    .min(6, 'Minimum 6 character required!')
    .max(40, 'Maximum 40 character!')
    .matches(lowercaseRegex, 'One lowercase required')
    .matches(uppercaseRegex, 'One uppercase required')
    .matches(numericRegex, 'One number required')
    .matches(specialRegex, 'One special character required')
    .required('Password is required!'),
  rePassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match!')
    .required('Password confirmation is required!'),
});

export default function Register() {

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="wrapper register">

      <Heading text="Register"/>

      <Formik
        initialValues={{username: '', email: '', password: '', rePassword: ''}}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="register-from">

            <FormikField name="username" label="Username" placeholder="Ex. John" icon="username"/>
            <FormikField name="email" label="Email" placeholder="Ex. john-doe@mail.com" icon="email"/>
            <FormikField name="password" label="Password" type="password" placeholder="Ex. John#567" icon="password"/>
            <FormikField name="rePassword" label="Confirm Password" type="password" icon="password"/>

            <Button fullWidth type="submit" variant="contained" size="large" color="primary" disabled={!props.isValid || !props.dirty}>
              Register
            </Button>

          </Form>
        )}
      </Formik>

    </div>
  );
}
