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
      search: '',
      redirect: false,
    };
  }

  static contextType = OfferContext;

  handleSearch = (values) => {
    console.log(values);
    this.setState({
      search: values.search,
      redirect: true,
    });

    this.context.updateOfferContext('search', values.search);
    console.log('filter after category click', values.search);
  };

  render() {

    const {ableRedirect} = this.props;
    const {redirect, search} = this.state;
    const {offersPerPage} = this.context;

    if (ableRedirect && redirect) {
      return <Redirect to={`/offers/all/1/${offersPerPage}/createdAt/-1/${search}`} />
    }

    return (
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
    );
  }
}

export default Search
