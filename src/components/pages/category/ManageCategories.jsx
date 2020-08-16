import React, {useContext} from 'react';
import Heading from "../../shared/Heading";
import {Form, Formik} from "formik";
import FormikField from "../../shared/form/FormikField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import CategoryService from "../../../services/category-service";
import {AlertContext} from "../../../context/alert-context";


const categorySchema = Yup.object().shape({
  newCategory: Yup.string()
    .required('Category is required!'),
});

export default function ManageCategories() {

  //Context
  const {counter, updateAlertContext} = useContext(AlertContext);

  //Service
  const categoryService = new CategoryService();

  const handleSubmit = async (values) => {
    try {

      const res = await categoryService.createCategory(values);

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

    } catch (error) {

      updateAlertContext('counter', counter + 1);
      updateAlertContext('errorContext', error.message);
    }
  };


  return (
    <div className="manage-categories wrapper">
      <Heading text="Manage Categories"/>

      <Formik
        initialValues={{newCategory: ''}}
        validationSchema={categorySchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="register-from">

            <FormikField name="newCategory" label="Category" placeholder="" icon="category"/>

            <Button fullWidth type="submit" variant="contained" size="large" color="primary" disabled={!props.isValid || !props.dirty}>
              Add Category
            </Button>

          </Form>
        )}
      </Formik>
    </div>
  );
}
