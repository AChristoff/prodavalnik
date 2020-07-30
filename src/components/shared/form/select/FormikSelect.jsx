import React from 'react';
import "./FormikSelect.scss"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from "@material-ui/core/FormHelperText";

const FormikSelect = ({label, items}) => {
  return <div className="formik-select">

    <FormControl fullWidth>
      <InputLabel htmlFor="category-select">{label}</InputLabel>
      <Select id="category-select">
        {
          items.map((item) => (
            <MenuItem key={item.value} value={item.value}>{item.category}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText></FormHelperText>

    </FormControl>
  </div>
};

export default FormikSelect;
