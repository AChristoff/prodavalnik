import React from 'react';
import {Form, Formik} from "formik";
import FormikField from "../FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import OffersService from "../../../../services/offers-service";
import {OfferContext} from "../../../../context/offer-context";
import FormikSelectPro from "../select/FormikSelectPro";

const OfferSchema = Yup.object().shape({
  title: Yup.string()
    .min(6, 'Min 6 chars!')
    .max(40, 'Max 40 chars!')
    .required('Title is required!'),
  category: Yup.string()
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
  static contextType = OfferContext;

  handleCreate = async (values) => {
    console.log(values);
    alert(values);
    try {
      const res = await OffersForm.service.createOffer(values);
      console.log(res);
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

  handleEdit = async (values) => {
    try {
      const res = await OffersForm.service.editOffer(this.offerId, values);
      console.log(res);
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
      console.log(res);
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

  // Converts HTML Entities from DB text to display the corresponding symbols
  sanitizedText = (text) => {
    const textConverter = document.createElement('textarea');
    textConverter.innerHTML = text;

    return textConverter.value;
  };


  render() {
    const {title, content, price, image, formType, filterProp, category} = this.props;
    console.log('form values', this.props);
    const {filter} = this.context;

/////////////////////////////////////////////
    //TODO: get items from db
    const items = [
      {
        value: '',
        category: 'All categories',
      },
      {
        value: 'Vehicles',
        category: 'Vehicles',
      },
      {
        value: 'Electronics & Appliances',
        category: 'Electronics & Appliances',
      },
      {
        value: 'Furniture & Decor',
        category: 'Furniture & Decor',
      },
      {
        value: 'Fashion & Beauty',
        category: 'Fashion & Beauty',
      },
      {
        value: 'Pets',
        category: 'Pets',
      },
      {
        value: 'Sports & Equipment',
        category: 'Sports & Equipment',
      },
      {
        value: 'Machines & Tools',
        category: 'Machines & Tools',
      },
      {
        value: 'Art & Books',
        category: 'Art & Books',
      },
      {
        value: 'Antiques',
        category: 'Antiques',
      },
    ];
/////////////////////////////////////////////

    return (
      <Formik
        initialValues={
          {
            title: title ? this.sanitizedText(title) : '',
            category: category ? this.sanitizedText(category) : '',
            content: content ? this.sanitizedText(content) : '',
            price: price || '',
            image: image || ''
          }
        }
        validationSchema={formType === 'delete' ? DeleteSchema : OfferSchema}
        onSubmit={this.handleSubmit(formType)}
      >
        {(props) => (
          <Form className="offer-from">

            <FormikField name="title" label="Title" icon="text" required={true} disabled={formType === 'delete'}/>

            <FormikSelectPro name='category' label='Category' items={items} required={true} disabled={formType === 'delete'} />

            <FormikField name="content" label="Description" icon="text" disabled={formType === 'delete'} required={true} multiline={true} rows={7} />

            <FormikField name="price" label="Price" icon="price" disabled={formType === 'delete'} required={true}/>

            <FormikField name="image" label="Image" icon="image" disabled={formType === 'delete'} required={true}/>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className={`${formType}-btn`}
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
