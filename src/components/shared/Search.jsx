import React from 'react';
import {Form, Formik} from "formik";
import FormikField from "./form/FormikField";
import * as Yup from "yup";
import {OfferContext} from "../../context/offer-context";
import {Redirect} from "react-router-dom";

const SearchSchema = Yup.object().shape({
  search: Yup.string()
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      searchState: '',
      redirect: false,
    };
  }

  static contextType = OfferContext;

  handleSearch = (values) => {
    this.setState({
      searchState: values.search,
      redirect: true,
    });

    this.context.updateOfferContext('search', values.search);
  };

  render() {

    const {ableRedirect} = this.props;
    const {redirect, searchState} = this.state;
    const {offersPerPage, search} = this.context;

    if (ableRedirect && redirect) {
      return <Redirect to={'/offers/all/'} />
    }

    return (
      <Formik
        initialValues={{search: search}}
        validationSchema={SearchSchema}
        onSubmit={this.handleSearch}
      >
        {(props) => (
          <Form className="search-form">
            <FormikField name="search" label="Search" type="text" icon="search"/>
          </Form>
        )}
      </Formik>
    );
  }
}

export default Search;
