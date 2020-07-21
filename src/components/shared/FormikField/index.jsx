import React from 'react';
import TextField from "@material-ui/core/TextField";
import {ErrorMessage, Field} from "formik";
import "./FormikField.scss"

export default function FormikField({name, label, type="text"}) {
  return (
    <div className="formik-field">
      <Field
        as={TextField}
        name={name}
        label={label}
        type={type}
        helperText={<ErrorMessage className="error-msg" name={name}/>}
        required
        fullWidth
        autoComplete="off"
      />
    </div>
  );
}
