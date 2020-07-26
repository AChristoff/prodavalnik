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
    .max(30, 'Max 30 chars!')
    .required('Category is required!'),
  content: Yup.string()
    .min(20, 'Min 20 chars!')
    .max(1200, 'Max 1200 chars!')
    .required('Description is required!'),
  price: Yup.number()
    .typeError('Price must a valid number!')
    .min(0.01, 'Price must be more then 0!')
    .required('Price is required!'),
  image: Yup.string()
    .min(6, 'Min 6 chars!')
    .max(400, 'Max 400 chars!')
    .required('Image is required!'),
});

const DeleteSchema = Yup.object().shape({
  title: Yup.string(),
  category: Yup.string(),
  content: Yup.string(),
  price: Yup.number(),
  image: Yup.string(),
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

  handleDelete = async () => {
    try {
      const res = await OffersForm.service.deleteOffer(this.offerId);

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

  handleSubmit = (formType) => {
    switch (formType) {
      case 'create':
        return this.handleCreate;
      case 'edit':
        return this.handleEdit;
      case 'delete':
        return this.handleDelete;
      default:
        return;
    }
  };

  render() {
    const {title, category, content, price, image, formType} = this.props;

    return (
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
        validationSchema={formType === 'delete' ? DeleteSchema : OfferSchema}
        onSubmit={this.handleSubmit(formType)}
      >
        {(props) => (
          <Form className="offer-from">

            <FormikField name="title" label="Title" icon="text" disabled={formType === 'delete'}/>
            <FormikField name="category" label="Category" icon="text" disabled={formType === 'delete'}/>
            <FormikField name="content" label="Description" icon="text" disabled={formType === 'delete'}/>
            <FormikField name="price" label="Price" icon="price" disabled={formType === 'delete'}/>
            <FormikField name="image" label="Image" icon="image" disabled={formType === 'delete'}/>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className={formType === 'delete' ? 'delete-btn' : ''}
              disabled={formType !== 'delete' ? (!props.isValid || !props.dirty) : false}
            >
              {formType}
            </Button>

          </Form>
        )}
      </Formik>
    );
  }
}

export default OffersForm;
