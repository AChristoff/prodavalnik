import React, {Fragment} from 'react';
import "./OffersForm.scss"
import {Form, Formik} from "formik";
import FormikField from "../FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import OffersService from "../../../../services/offers-service";
import {OfferContext} from "../../../../context/offer-context";
import FormikCategorySelect from "../select/FormikCategorySelect";
import SubFooter from "../../subFooter/SubFooter";

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
    .min(1, 'Price can not be less than 1!')
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

// export default function AllOffers() {

  
//   const {pathname} = useLocation();

//   // Context
//   const {role} = useContext(AuthContext);

//   const method = pathname === '/offers/approval' ? 'approval' : 'all';
//   const headingText = pathname === '/offers/approval' ? 'Offers pending approval' : 'Offers';

//   return (
//     <CardsContainer
//       method={method}
//       headingText={headingText}
//       isAdmin={role === 'Admin'}
//     />
//   )
// }

class OffersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      offer: {},
      isLoading: true,
      file: '',
      resizedImg: '',
    };
    this.offerId = this.props.match.params.id;
  }

  static service = new OffersService();
  static contextType = OfferContext;

  handleCreate = async (values) => {
    const { updateAlertContext, counter } = this.props;

    try {
      const res = await OffersForm.service.createOffer(values);

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors;
        }
        throw new Error(message);
      } else if (res.error) {
        throw new Error(res.error.message);
      }

      updateAlertContext('successContext', `${res.post.title} was created!`);
      this.props.history.push('/user/offers');
    } catch (error) {
      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  handleEdit = async (values) => {
    const { updateAlertContext, counter } = this.props;

    try {
      const res = await OffersForm.service.editOffer(this.offerId, values);

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors;
        }
        throw new Error(message);
      } else if (res.error) {
        throw new Error(res.error.message);
      }

      updateAlertContext('successContext', `${res.post.title} was updated!`);
      this.props.history.push(`/offers/view/${this.offerId}`);
    } catch (error) {
      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  handleDelete = async () => {
    const { updateAlertContext, counter } = this.props;

    try {
      const res = await OffersForm.service.deleteOffer(this.offerId);

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors;
        }
        throw new Error(message);
      } else if (res.error) {
        throw new Error(res.error.message);
      }

      updateAlertContext(
        'successContext',
        `The offer was deleted successfully!`
      );
      this.props.history.push('/user/offers');
    } catch (error) {
      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  handleSubmit = (formType) => {
    switch (formType) {
      case 'add':
        return this.handleCreate;
      case 'edit':
        return this.handleEdit;
      case 'delete':
        return this.handleDelete;
      default:
        return;
    }
  };

  handleChange = (event) => {
    const file = event.target.files[0];
    let output = '123';
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      const imgElement = document.createElement('img');
      imgElement.src = e.target.result;

      imgElement.onload = function (evt) {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;

        const scaleSize = MAX_WIDTH / evt.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = evt.target.height * scaleSize;

        const ctx = canvas.getContext('2d');
      
        ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
        console.log(imgElement);
        output = ctx.canvas.toDataURL(imgElement, "image/png");
        console.log(output);
        
        this.setState({
          file: e.target.result,
          resizedImg: output,
        });
        
      };
    };
  };

  // Converts HTML Entities from DB text to display the corresponding symbols
  sanitizedText = (text) => {
    const textConverter = document.createElement('textarea');
    textConverter.innerHTML = text;

    return textConverter.value;
  };

  render() {
    const { title, content, price, image, formType, category } = this.props;

    return (
      <Fragment>
        <Formik
          initialValues={{
            title: title ? this.sanitizedText(title) : '',
            category: category ? category._id : '',
            content: content ? this.sanitizedText(content) : '',
            price: price || '',
            image: image || '',
          }}
          validationSchema={formType === 'delete' ? DeleteSchema : OfferSchema}
          onSubmit={this.handleSubmit(formType)}
        >
          {(props) => (
            <Form className="offer-from">
              <FormikField
                name="title"
                label="Title"
                icon="text"
                required={true}
                disabled={formType === 'delete'}
              />

              <FormikCategorySelect
                name="category"
                label="Category"
                required={true}
                disabled={formType === 'delete'}
              />

              <FormikField
                name="content"
                label="Description"
                icon="text"
                disabled={formType === 'delete'}
                fieldStyle="filled"
                required={true}
                multiline={true}
                rows={7}
                className="formik-textarea"
              />

              <FormikField
                name="price"
                label="Price"
                icon="price"
                disabled={formType === 'delete'}
                required={true}
              />

              <label className="image-label">Add image *</label>

              <input
                className="upload-image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={this.handleChange}
              />

              {this.state.file ? (
                <div>
                  <img
                    src={this.state.file}
                    alt="Upload"
                    className="img-preview file"
                  ></img>
                  <img
                    src={this.state.resizedImg}
                    alt="Upload"
                    className="img-preview output"
                  ></img>
                </div>
              ) : null}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                className={`${formType}-btn`}
                disabled={
                  formType !== 'delete' ? !props.isValid || !props.dirty : false
                }
              >
                {formType}
              </Button>
            </Form>
          )}
        </Formik>

        <SubFooter />
      </Fragment>
    );
  }
}

export default OffersForm;
