import React from 'react';
import {Redirect} from "react-router-dom";

import {Form, Formik} from "formik";
import FormikField from "../../../shared/form/FormikField";
import OffersService from "../../../../services/offers-service";
import * as Yup from "yup";
import {OfferContext} from "../../../../context/offer-context";

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
  static contextType = OfferContext;

  handleSearch = (values) => {
    console.log(values);
    this.setState({
      search: values.search,
      redirect: true,
    })
  };

  render() {

    const {redirect, search} = this.state;
    const {offersPerPage} = this.context;

    if (redirect) {
      return <Redirect to={`/offers/all/1/${offersPerPage}/createdAt/-1/${search}`} />
    }

    return (
      <div className="jumbotron">
        <div className="wrapper">
          <h1><span>Buy</span> & <span>sell</span> online!</h1>


          <Formik
            initialValues={{search: ''}}
            validationSchema={SearchSchema}
            onSubmit={this.handleSearch}
          >
            {(props) => (
              <Form className="search-form">
                <FormikField name="search" label="Search" type="text" icon="search"/>
              </Form>
            )}
          </Formik>

        </div>
      </div>
    );
  }
}

export default Jumbotron;
