import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './OffersForm.scss';
import { Form, Formik, useFormik } from 'formik';
import FormikField from '../FormikField';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import OffersService from '../../../../services/offers-service';
import { OfferContext } from '../../../../context/offer-context';
import { AlertContext } from '../../../../context/alert-context';
import FormikCategorySelect from '../select/FormikCategorySelect';
import { useHistory } from 'react-router-dom';
import SubFooter from '../../subFooter/SubFooter';

const OfferSchema = Yup.object().shape({
  title: Yup.string().min(6, 'Min 6 chars!').max(40, 'Max 40 chars!').required('Title is required!'),
  category: Yup.string().required('Category is required!'),
  content: Yup.string().min(20, 'Min 20 chars!').max(1200, 'Max 1200 chars!').required('Description is required!'),
  price: Yup.number().typeError('Price must a valid number!').min(1, 'Price can not be less than 1!').required('Price is required!'),
  image: Yup.mixed(),
});

const DeleteSchema = Yup.object().shape({
  title: Yup.string(),
  category: Yup.string(),
  content: Yup.string(),
  price: Yup.number(),
  image: Yup.string(),
});

export default function OffersForm({ counter, title, content, price, image, formType, category }) {
  //State
  const [file, setFile] = useState('');
  const [resizedImg, setResizedImg] = useState('');
  const { updateAlertContext } = useContext(AlertContext);

  //Query params
  const { id } = useParams();

  //Service
  const offersService = new OffersService();

  //History
  const history = useHistory();

  const handleCreate = async (values) => {

    // return console.log(values);

    try {
      const res = await offersService.createOffer(values);

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
      history.push('/user/offers');
    } catch (error) {
      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  const handleEdit = async (values) => {
    try {
      const res = await offersService.editOffer(id, values);

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
      history.push(`/offers/view/${id}`);
    } catch (error) {
      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await offersService.deleteOffer(id);

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

      updateAlertContext('successContext', `The offer was deleted successfully!`);
      history.push('/user/offers');
    } catch (error) {
      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  const handleSubmit = (formType) => {
    switch (formType) {
      case 'add':
        return handleCreate;
      case 'edit':
        return handleEdit;
      case 'delete':
        return handleDelete;
      default:
        return;
    }
  };

  const handleResize = (event) => {
    const file = event.target.files[0];
    let output = '';
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
        output = ctx.canvas.toDataURL(imgElement);

        // setFile(e.target.result);
        setResizedImg(output);
      };
    };
  };

  // Converts HTML Entities from DB text to display the corresponding symbols
  const sanitizedText = (text) => {
    const textConverter = document.createElement('textarea');
    textConverter.innerHTML = text;

    return textConverter.value;
  };

  const formik = useFormik({
    initialValues: {
      image: 'initialImageValue',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Fragment>
      <Formik
        initialValues={{
          title: title ? sanitizedText(title) : '',
          category: category ? category._id : '',
          content: content ? sanitizedText(content) : '',
          price: price || '',
          image: image || '2',
        }}
        validationSchema={formType === 'delete' ? DeleteSchema : OfferSchema}
        onSubmit={handleSubmit(formType)}
      >
        {(props) => (
          <Form className="offer-from">
            <FormikField name="title" label="Title" icon="text" required={true} disabled={formType === 'delete'} />

            <FormikCategorySelect name="category" label="Category" required={true} disabled={formType === 'delete'} />

            <FormikField name="content" label="Description" icon="text" disabled={formType === 'delete'} fieldStyle="filled" required={true} multiline={true} rows={7} className="formik-textarea" />

            <FormikField name="price" label="Price" icon="price" disabled={formType === 'delete'} required={true} />

            {/* <FormikField name="image" label="Image" icon="image" disabled={formType === 'delete'} required={true}/> */}

            <label className="image-label">Add image *</label>

            <input
              name="image"
              className="upload-image"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleResize}
              onBlur={(e) => {
                props.setFieldValue('image', resizedImg);
              }}
            />

            {file ? (
              <div>
                {/* <img src={file} alt="Upload" className="img-preview file"></img> */}
                <img src={resizedImg} alt="Upload" className="img-preview output"></img>
              </div>
            ) : null}

            <Button fullWidth type="submit" variant="contained" size="large" color="primary" className={`${formType}-btn`} disabled={formType !== 'delete' ? !props.isValid || !props.dirty : false}>
              {formType}
            </Button>
          </Form>
        )}
      </Formik>

      <SubFooter />
    </Fragment>
  );
}
