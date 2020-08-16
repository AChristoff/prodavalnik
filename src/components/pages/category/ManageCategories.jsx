import React, {useContext, useEffect, useState} from 'react';
import './manage-categories.scss'
import Heading from "../../shared/Heading";
import {Form, Formik} from "formik";
import FormikField from "../../shared/form/FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import CategoryService from "../../../services/category-service";
import {AlertContext} from "../../../context/alert-context";
import FormikCategorySelect from "../../shared/form/select/FormikCategorySelect";

const categorySchema = Yup.object().shape({
  newCategory: Yup.string()
    .required('Category is required!'),
  categories: Yup.string()
});

export default function ManageCategories() {

  //State
  const [addCategory, setAddCategory] = useState('');

  //Context
  const {counter, updateAlertContext} = useContext(AlertContext);

  //Service
  const categoryService = new CategoryService();

  const handleSubmit = async (values, {resetForm}) => {
    const {newCategory} = {...values};
    resetForm({});

    try {

      const res = await categoryService.createCategory({newCategory});

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors
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

  return (
    <div className="manage-categories wrapper">
      <Heading text="Manage Categories"/>

      <Formik
        initialValues={
          {
            newCategory: '',
            categories: ''
          }
        }
        validationSchema={categorySchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="categories-from">

            <FormikCategorySelect
              name='categories'
              label='Current categories:'
              addCategory={addCategory}
            />

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


    </div>
  );
}
