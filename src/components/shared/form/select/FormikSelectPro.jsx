import React from 'react';

import {Field, ErrorMessage} from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from "@material-ui/core/FormHelperText";

// Converts HTML Entities from DB text to display the corresponding symbols
const sanitizedText = (text) => {
  const textConverter = document.createElement('textarea');
  textConverter.innerHTML = text;

  return textConverter.value;
}

const MuiSelect = ({name, label, items, errorString, value, onChange, onBlur, required, disabled}) => {

  return (

    <FormControl fullWidth>
      <InputLabel required={required} htmlFor="mui-select">{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        id="mui-select"
      >
        {
          items.map((item) => (
            <MenuItem key={item._id} value={item._id}>{sanitizedText(item.category)}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{errorString}</FormHelperText>

    </FormControl>
  );
};

export default function FormikSelectPro({name, label, items, required = false, disabled = false}) {

  return (
    <div className="formik-select">
      <Field
        name={name}
        as={MuiSelect}
        label={label}
        items={items}
        required={required}
        disabled={disabled}
        errorString={<ErrorMessage name={name}/>}
      />
    </div>

  );
}
