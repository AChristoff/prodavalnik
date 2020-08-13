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
import {NavLink, Redirect} from "react-router-dom";
import SnackbarAlert from "../../shared/snackbar/Snackbar";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialRegex = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/;
const alphanumericRegex = /^\w+$/;

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Username must be at least 2 characters!')
    .max(12, 'Username must be maximum 12 characters!')
    .matches(alphanumericRegex, 'Username must contain only letters, numbers and _')
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
      success: '',
      user: {},
      stepTwoDone: false,
      stepThreeDone: false,
      isLoading: false,
      username: '',
      password: '',
      rePassword: '',
      isExpired: false,
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

    try {

      const res = await RegisterConfirm.service.registerConfirm(this.token, values);

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors
        }
        console.log('errors', res.errors);
        this.setState({
          error: message,
          success: '',
          username: values.name,
          password: values.password,
        });
        throw new Error(message);
      } else if (res.error) {
        this.setState({
          error: res.error.message,
          success: '',
          username: values.name,
          password: values.password,
        });
        if (res.error.message === 'jwt expired') {
          this.setState({
            isExpired: true
          });
          throw new Error('Your registration link is expired!');
        } else {
          throw new Error(res.error.message);
        }
      } else {

        this.setState({
          username: res.username,
          success: res.message,
          error: '',
        });
      }

      this.setState({
        success: res.message,
        error: '',
        isLoading: false,
        stepTwoDone: true,
        stepThreeDone: true,
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
    const {isAuth} = this.context;
    const {
      isExpired,
      isLoading,
      success,
      error,
      username,
      password,
      rePassword,
      stepTwoDone,
      stepThreeDone
    } = this.state;


    if (isLoading) {
      return <Loading/>
    }

    if (isExpired) {
      return (
        <div className="wrapper register-confirm expired">

          <Conditional if={error.length}>
            <SnackbarAlert typeProp="error" messageProp={error} isOpen={true}/>
          </Conditional>

          <Heading text="Register"/>

          <h5 className="headings">Your registration link is expired!</h5>
          <h6 className="headings">Click the button bellow for new one.</h6>

          <Button className="to-register-btn" fullWidth type="submit" variant="contained" size="large" color="primary">
            <NavLink to="/user/register" exact>
              Generate link here
            </NavLink>
          </Button>

        </div>
      )
    }

    if (stepThreeDone) {
      return (
        <div className="wrapper register-confirm">

          <Conditional if={success.length}>
            <SnackbarAlert typeProp="success" messageProp={success} isOpen={true}/>
          </Conditional>

          <Heading text="Register"/>

          <Stepper stepOneDone={true} stepTwoDone={stepTwoDone} stepThreeDone={stepThreeDone}/>

          <div className="register-confirm-from">

            <h5 className="headings">Congratulations!</h5>
            <h6 className="headings">Your registration is complete.</h6>

            <Button fullWidth type="submit" variant="contained" size="large" color="primary">
              <NavLink to="/offers/create" exact>
                Add your first offer
              </NavLink>
            </Button>
          </div>

        </div>
      )
    }

    if (isAuth) {
      return (
        <Redirect to="/"/>
      );
    }

    return (
      <div className="wrapper register-confirm">

        <Conditional if={error.length}>
          <SnackbarAlert typeProp="error" messageProp={error} isOpen={true}/>
        </Conditional>

        <Heading text="Register"/>

        <Stepper stepOneDone={true} stepTwoDone={stepTwoDone} stepThreeDone={stepThreeDone}/>

        <Formik
          initialValues={{name: username, password, rePassword}}
          validationSchema={RegisterSchema}
          onSubmit={this.handleSubmit}
        >
          {(props) => (
            <Form className="register-confirm-from">

              <FormikField required={true} name="name" label="Username" placeholder="Ex. John" icon="username"/>
              <FormikField required={true} name="password" label="Password" type="password" placeholder="Ex. John#567" icon="password"/>
              <FormikField required={true} name="rePassword" label="Confirm Password" type="password" icon="password"/>

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