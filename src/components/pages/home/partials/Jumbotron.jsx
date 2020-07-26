import React from 'react';
import {Redirect} from "react-router-dom";

import {Form, Formik} from "formik";
import FormikField from "../../../shared/form/FormikField";
import OffersService from "../../../../services/offers-service";
import * as Yup from "yup";

const SearchSchema = Yup.object().shape({
  search: Yup.string()
});


class Jumbotron extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      search: '',
      redirect: false,
    };
  }

  static service = new OffersService();

  handleSubmit = (values) => {
    console.log(values);
    this.setState({
      search: values.search,
      redirect: true,
    })

    //page = '1', limit = '6', sort = '', order = '', search = '', filter = ''

    // this.setState({
    //   error: '',
    // }, async () => {
    //   try {
    //     const res = await Jumbotron.service.getAllOffers(values);
    //
    //     if (res.errors) {
    //       const message = res.message;
    //       throw new Error(message);
    //     }
    //   } catch (error) {
    //
    //     this.setState({
    //       error: error.message,
    //     })
    //   }
    // });
  };

  render() {

    const {redirect, search} = this.state;

    if (redirect) {
      return <Redirect to={`/offers/${search}`} />
    }

    return (
      <div className="jumbotron">
        <div className="wrapper">
          <h1><span>Buy</span> & <span>sell</span> online!</h1>


          <Formik
            initialValues={{search: ''}}
            validationSchema={SearchSchema}
            onSubmit={this.handleSubmit}
          >
            {(props) => (
              <Form className="search-form">
                <FormikField name="search" label="Search" type="text" icon="search"/>
              </Form>
            )}
          </Formik>


          {/*<form className="search-from">*/}
          {/*  <FormControl className="search">*/}
          {/*    <InputLabel htmlFor="search">Search</InputLabel>*/}
          {/*    <Input*/}
          {/*      id="search"*/}
          {/*      placeholder="..."*/}
          {/*      type="text"*/}
          {/*      value={values.search}*/}
          {/*      endAdornment={*/}
          {/*        <InputAdornment position="end">*/}
          {/*          <Search/>*/}
          {/*        </InputAdornment>*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </FormControl>*/}
          {/*</form>*/}
        </div>
      </div>
    );
  }
}

export default Jumbotron;
