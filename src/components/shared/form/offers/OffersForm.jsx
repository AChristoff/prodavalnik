import React from 'react';
import {Form, Formik} from "formik";
import FormikField from "../FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import OffersService from "../../../../services/offers-service";

const OfferSchema = Yup.object().shape({
  title: Yup.string()
    .min(6, 'Min 6 chars!')
    .max(40, 'Max 40 chars!')
    .required('Title is required!'),
  category: Yup.string()
    .min(2, 'Min 6 chars!')
    .max(20, 'Max 40 chars!')
    .required('Category is required!'),
  content: Yup.string()
    .min(20, 'Min 20 chars!')
    .max(1200, 'Max 400 chars!')
    .required('Description is required!'),
  price: Yup.number()
    .typeError('Price must a valid number!')
    .min(1, 'Price must be more then 1 BGN!')
    .required('Price is required!'),
  image: Yup.string()
    .min(6, 'Min 6 chars!')
    .max(80, 'Max 80 chars!')
    .required('Image is required!'),
});

class OffersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      offer: {},
      isLoading: true,
    };
    this.offerId = this.props.match.params.id
  }

  static service = new OffersService();

  handleCreate = async (values) => {
    try {
      const res = await OffersForm.service.createOffer(values);

      if (res.errors) {
        const message = res.message;
        throw new Error(message);
        console.log(res.status);
      } else if (res.status === 201) {
        console.log("before");
        this.props.history.push("/user/offers");
      }

    } catch (error) {

      this.setState({
        error: error.message,
      })
    }
  };

  handleEdit = async (values) => {
    try {
      const res = await OffersForm.service.editOffer(this.offerId, values);

      if (res.errors) {
        const message = res.message;
        throw new Error(message);
      } else {
        this.props.history.push("/user/offers");
      }

    } catch (error) {

      this.setState({
        error: error.message,
      })
    }
  };

  render() {
    const {title, category, content, price, image, isEdit} = this.props;

    return (
      <div className="create-offer wrapper">

        <Formik
          initialValues={
            {
              title: title || '',
              category: category || '',
              content: content || '',
              price: price || '',
              image: image || ''
            }
          }
          validationSchema={OfferSchema}
          onSubmit={isEdit ? this.handleEdit : this.handleCreate}
        >
          {(props) => (
            <Form className="create-offer-from">

              <FormikField name="title" label="Title" icon="username"/>
              <FormikField name="category" label="Category" icon="username"/>
              <FormikField name="content" label="Description" icon="username"/>
              <FormikField name="price" label="Price" icon="username"/>
              <FormikField name="image" label="Image" icon="username"/>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                disabled={!props.isValid || !props.dirty}
              >
                {isEdit ? 'Edit' : 'Create'}
              </Button>

            </Form>
          )}
        </Formik>

      </div>
    );
  }
}

export default OffersForm;
