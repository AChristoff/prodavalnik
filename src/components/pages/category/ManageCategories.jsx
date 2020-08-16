import React, {useContext, useEffect, useState} from 'react';
import './manage-categories.scss'
import Heading from "../../shared/Heading";
import {Form, Formik} from "formik";
import FormikField from "../../shared/form/FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import CategoryService from "../../../services/category-service";
import {AlertContext} from "../../../context/alert-context";
import FormikSelectPro from "../../shared/form/select/FormikSelectPro";


const categorySchema = Yup.object().shape({
  newCategory: Yup.string()
    .required('Category is required!'),
  categories: Yup.string()
});

export default function ManageCategories() {

  //State
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState(0);

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
      setAddCategory(addCategory + 1);
    } catch (error) {

      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };

  //Component did mount & update
  useEffect(() => {
    (async () => {

      try {
        const res = await categoryService.getCategories();
        setCategories(res.categories);
      } catch (error) {
        updateAlertContext('errorContext', error.message);
      }
    })();

  }, [addCategory]);

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

            <FormikSelectPro name='categories' label='Current Categories' items={categories}/>

            <FormikField name="newCategory" label="Add Category" placeholder="" icon="category"/>

            <Button fullWidth type="submit" variant="contained" size="large" color="primary" disabled={!props.isValid || !props.dirty}>
              Add Category
            </Button>


          </Form>
        )}
      </Formik>


    </div>
  );
}
