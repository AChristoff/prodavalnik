import React from 'react';

import {Field, ErrorMessage} from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from "@material-ui/core/FormHelperText";


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
            <MenuItem key={item.value} value={item.value}>{item.category}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{errorString}</FormHelperText>

    </FormControl>
  );
};

export default function FormikSelectPro({name, label, items, required = false, disabled = false}) {
  console.log(name);
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
