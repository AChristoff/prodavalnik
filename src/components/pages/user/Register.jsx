import React from 'react';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import FormikField from "../../shared/form/FormikField";
import Heading from "../../shared/Heading";
import AuthService from "../../../services/auth-service";
import Loading from "../../shared/Loading";
import Conditional from "../../shared/Conditional";
import Stepper from "../../shared/stepper/Stepper";
import {NavLink, Redirect} from "react-router-dom";
import {AuthContext} from "../../../context/user-context";
import SnackbarAlert from "../../shared/snackbar/Snackbar";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email!')
    .required('Email is required!'),
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: '',
      error: '',
      isLoading: false,
      stepOneDone: false,
      email: '',
    };
    this.userId = window.localStorage.getItem('userId')
  }

  static service = new AuthService();
  static contextType = AuthContext;

  handleSubmit = async (values) => {

    this.setState({
      isLoading: true,
      email: values.email
    });

    try {

      const res = await Register.service.register(values);

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors
        }
        throw new Error(message);
      }

      this.setState({
        success: res.message,
        error: '',
        isLoading: false,
        stepOneDone: true,
      });

    } catch (error) {

      this.setState({
        error: error.toString(),
        isLoading: false,
      });

    }
  };

  render() {
    const {isLoading, success, error, stepOneDone, email} = this.state;
    const {isAuth} = this.context;

    if (isAuth) {
      return (
        <Redirect to="/"/>
      );
    }


    if (isLoading) {
      return <Loading/>
    }

    if (stepOneDone) {
      return (
        <div className="wrapper register">

          <Conditional if={success.length}>
            <SnackbarAlert typeProp="success" messageProp={success} isOpen={true}/>
          </Conditional>

          <Heading text="Register"/>

          <Stepper stepOneDone={stepOneDone}/>

          <div className="register-from">

            <h6 className="headings"><b>{email}</b> was successfully registered!</h6>
            <h6 className="headings">Please check your inbox to continue...</h6>

          </div>
        </div>
      )
    }

    return (

      <div className="wrapper register">

        <Conditional if={error.length}>
          <SnackbarAlert typeProp="error" messageProp={error} isOpen={true}/>
        </Conditional>

        <Heading text="Register"/>

        <Stepper stepOneDone={stepOneDone}/>

        <Formik
          initialValues={{email: ''}}
          validationSchema={RegisterSchema}
          onSubmit={this.handleSubmit}
        >
          {(props) => (
            <Form className="register-from">

              <FormikField name="email" label="Email" placeholder="Ex. john-doe@mail.com" icon="email"/>

              <Button fullWidth type="submit" variant="contained" size="large" color="primary" disabled={!props.isValid || !props.dirty}>
                Register
              </Button>

            </Form>
          )}
        </Formik>

        <NavLink className="go-to-login" to="/user/login" exact>
          Already have an account? Login here!
        </NavLink>

      </div>
    )
      ;
  }
}

export default Register;