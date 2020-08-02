import React from 'react';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import FormikField from "../../shared/form/FormikField";
import Heading from "../../shared/Heading";
import AuthService from "../../../services/auth-service";
import {AuthContext} from "../../../context/user-context";
import Conditional from "../../shared/Conditional";
import Loading from "../../shared/Loading";
import Stepper from "../../shared/stepper/Stepper";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialRegex = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/;
const letterRegex = /^[A-Za-z]+$/;

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Username must be at least 2 characters!')
    .max(20, 'Username must be maximum 20 characters!')
    .matches(letterRegex, 'Username must contain only letters!')
    .required('Username is required!'),
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

class RegisterConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      user: {},
      isLoading: false,
    };
    this.token = this.props.match.params.token;
  }

  static service = new AuthService();
  static contextType = AuthContext;

  handleSubmit = async (values) => {
    const {updateUserData} = this.context;
    this.setState({
      isLoading: true,
    });

    delete values.rePassword;
    console.log(values);

    try {

      const res = await RegisterConfirm.service.registerConfirm(this.token, values);

      if (res.errors) {
        const message = res.message;
        throw new Error(message);
      }

      this.setState({
        success: res.message,
        error: '',
        isLoading: false,
      });

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
        isLoading: false,
      });

    }
  };

  render() {

    const {isLoading, success, error} = this.state;

    if (isLoading) {
      return <Loading/>
    }

    return (
      <div className="wrapper register-confirm">

        <Conditional if={error.length}>
          <div className='error-message'>Error: {error}</div>
        </Conditional>

        <Conditional if={success}>
          <div className='success-message'>{success}</div>
        </Conditional>

        <Heading text="Register"/>

        <Stepper stepOneDone={true}/>

        <Formik
          initialValues={{name: '', password: '', rePassword: ''}}
          validationSchema={RegisterSchema}
          onSubmit={this.handleSubmit}
        >
          {(props) => (
            <Form className="register-confirm-from">

              <FormikField name="name" label="Username" placeholder="Ex. John" icon="username"/>
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
}

export default RegisterConfirm;