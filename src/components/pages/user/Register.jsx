import React from 'react';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import FormikField from "../../shared/form/FormikField";
import Heading from "../../shared/Heading";
import AuthService from "../../../services/auth-service";
import Loading from "../../shared/Loading";
import Conditional from "../../shared/Conditional";

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
    };
    this.userId = window.localStorage.getItem('userId')
  }

  static service = new AuthService();

  handleSubmit = async (values) => {
    this.setState({
      isLoading: true,
    });

    try {

      const res = await Register.service.register(values);

      if (res.errors) {
        const message = res.message;
        throw new Error(message);
      }

      this.setState({
        success: res.message,
        error: '',
        isLoading: false,
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

      <div className="wrapper register">

        <Conditional if={error.length}>
          <div className='error-message'>Error: {error}</div>
        </Conditional>

        <Conditional if={success}>
          <div className='success-message'>{success}</div>
        </Conditional>

        <Heading text="Register"/>

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

      </div>
    )
      ;
  }
}

export default Register;