import React from 'react';
import * as Yup from "yup";

import {ErrorMessage, Field, Form, Formik} from 'formik';


/*import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from '@material-ui/icons/MailOutline';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";*/

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
  /*  const [values, setValues] = React.useState({
      email: '',
      password: '',
      showPassword: false,
    });

    const handleChange = (prop) => (event) => {
      setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
      setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };*/

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="wrapper login">
      <h2>Login</h2>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <div>
              <label htmlFor="email">Email:</label>
              <Field autoComplete="off" name="email"/>
              <ErrorMessage name="email"/>
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <Field autoComplete="off" type="password" name="password"/>
              <ErrorMessage name="password"/>
            </div>
            <button disabled={!props.isValid || !props.dirty} type="submit">Login</button>
          </Form>
        )}
      </Formik>

      {/*<form className="login-from">

        <p>
          <FormControl required className="email">
            <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
            <Input
              id="standard-adornment-password"
              placeholder="Ex. john@mail.com"
              type="text"
              value={values.email}
              endAdornment={
                <InputAdornment position="end">
                  <MailOutline/>
                </InputAdornment>
              }
            />
          </FormControl>
        </p>

        <p>
          <FormControl required>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              placeholder="Ex. John#123"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </p>

        <Button variant="contained" size="large" color="primary">Login</Button>

      </form>*/}

    </div>
  );
}
