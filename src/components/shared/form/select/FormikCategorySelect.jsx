import React, {useEffect, useContext, useState} from 'react';

import {Field, ErrorMessage} from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from "@material-ui/core/FormHelperText";
import CategoryService from "../../../../services/category-service";
import {AlertContext} from "../../../../context/alert-context";

// Converts HTML Entities from DB text to display the corresponding symbols
const sanitizedText = (text) => {
  const textConverter = document.createElement('textarea');
  textConverter.innerHTML = text;

  return textConverter.value;
};

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
            <MenuItem key={item._id} value={item._id}>{sanitizedText(item.name)}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{errorString}</FormHelperText>

    </FormControl>
  );
};

export default function FormikCategorySelect(
  {
    name,
    label,
    addCategory,
    required = false,
    disabled = false
  }) {

  //State
  const [categories, setCategories] = useState([]);

  //Context
  const {updateAlertContext} = useContext(AlertContext);

  //Service
  const categoryService = new CategoryService();

  //Component did mount
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
    <div className="formik-select">
      <Field
        name={name}
        as={MuiSelect}
        label={label}
        items={categories}
        required={required}
        disabled={disabled}
        errorString={<ErrorMessage name={name}/>}
      />
    </div>

  );
}
