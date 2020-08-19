import React, { useContext, useState } from 'react';
import './manage-categories.scss';
import Heading from '../../shared/Heading';
import { Form, Formik } from 'formik';
import FormikField from '../../shared/form/FormikField';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import CategoryService from '../../../services/category-service';
import { AlertContext } from '../../../context/alert-context';
import FormikCategorySelect from '../../shared/form/select/FormikCategorySelect';

const categoryAddSchema = Yup.object().shape({
  newCategory: Yup.string().required('Category is required!'),
});

const categoryEditSchema = Yup.object().shape({
  categoryToEdit: Yup.string(),
  newCategoryName: Yup.string().required('Category is required for edit!'),
});

const categoryDeleteSchema = Yup.object().shape({
  category: Yup.string().required('Category is required for delete!'),
});

export default function ManageCategories() {
  //State
  const [addCategory, setAddCategory] = useState('');

  //Context
  const { counter, updateAlertContext } = useContext(AlertContext);

  //Service
  const categoryService = new CategoryService();

  const handleAdd = async (values, { resetForm }) => {
    const { newCategory } = { ...values };
    resetForm({});

    try {
      const res = await categoryService.createCategory({ newCategory });

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

      updateAlertContext('successContext', res.message);
      setAddCategory(res.category._id);
    } catch (error) {
      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  const handleEdit = async (values, { resetForm }) => {
    
    try {
      const res = await categoryService.editCategory(values);

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

      updateAlertContext('successContext', res.message);
      setAddCategory(res.category._id);
    } catch (error) {
      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  const handleDelete = async (values, { resetForm }) => {
    resetForm({});

    try {
      const res = await categoryService.deleteCategory(values);

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

      updateAlertContext('successContext', res.message);
      setAddCategory(0);
    } catch (error) {
      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  return (
    <div className="manage-categories wrapper">
      <Heading text="Manage Categories" />
      {/* -------------------- ADD ---------------------------- */}
      <Formik
        initialValues={{
          newCategory: '',
        }}
        validationSchema={categoryAddSchema}
        onSubmit={handleAdd}
      >
        {(props) => (
          <Form className="categories-from">
            <FormikField
              name="newCategory"
              label="Add Category"
              placeholder=""
              icon="category"
              className="add-category-input"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              disabled={!props.isValid || !props.dirty}
            >
              Add Category
            </Button>
          </Form>
        )}
      </Formik>
      {/* -------------------- EDIT ---------------------------- */}
      <Formik
        initialValues={{
          categoryToEdit: '',
          newCategoryName: '',
        }}
        validationSchema={categoryEditSchema}
        onSubmit={handleEdit}
      >
        {(props) => (
          <Form className="categories-from">
            <FormikCategorySelect
              name="categoryToEdit"
              label="Select category to edit:"
              addCategory={addCategory}
            />

            <FormikField
              name="newCategoryName"
              label="Edit Category"
              placeholder=""
              icon="category"
              className="Edit-category-input"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className="edit-btn"
              disabled={!props.isValid || !props.dirty}
            >
              Edit category
            </Button>
          </Form>
        )}
      </Formik>
      {/* -------------------- Delete ---------------------------- */}
      <Formik
        initialValues={{
          category: '',
        }}
        validationSchema={categoryDeleteSchema}
        onSubmit={handleDelete}
      >
        {(props) => (
          <Form className="categories-from">
            <FormikCategorySelect
              name="category"
              label="Select category for delete:"
              addCategory={addCategory}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className="delete-btn"
              disabled={!props.isValid || !props.dirty}
            >
              Delete category
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
