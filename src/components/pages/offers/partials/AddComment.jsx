import React, {useState} from 'react';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {useParams} from "react-router-dom";
import FormikField from "../../../shared/form/FormikField";
import Button from "@material-ui/core/Button";
import OffersService from "../../../../services/offers-service";

const commentSchema = Yup.object().shape({
  content: Yup.string()
    .min(2, 'Min 2 chars!')
    .max(400, 'Max 400 chars!')
    .required(''),
});

export default function AddComment({updateCommentsOnSubmit}) {
  //State
  const [error, setError] = useState('');

  //Query params
  const {id} = useParams();

  //Service
  const offersService = new OffersService();

  const handleSubmit = async (values, {resetForm}) => {

    try {
      const res = await offersService.addComment(id, values);

      if (res.errors) {
        const message = res.message;
        throw new Error(message);
      }

      updateCommentsOnSubmit();
      resetForm({content: ''});

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="wrapper add-comment">
      <Formik
        initialValues={
          {
            content: '',
          }
        }
        validationSchema={commentSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="comment-from">

            <FormikField name="content" label="Comment" icon="text" multiline={true} rows={7} fieldStyle="filled" className="formik-textarea"/>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              disabled={!props.isValid || !props.dirty}
            >
              Add comment
            </Button>

          </Form>
        )}
      </Formik>
    </div>
  );
}
