import React, {useContext, useEffect, useState} from 'react';
import "./FormikSelect.scss"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {OfferContext} from "../../../../context/offer-context";
import CategoryService from "../../../../services/category-service";
import {AlertContext} from "../../../../context/alert-context";

// Converts HTML Entities from DB text to display the corresponding symbols
const sanitizedText = (text) => {
  const textConverter = document.createElement('textarea');
  textConverter.innerHTML = text;

  return textConverter.value;
};

const FormikSelect = ({label, name, helperText, filterProp, disabled, changeContext}) => {

  const [category, setCategory] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [editFilter, setEditFilter] = React.useState(filterProp);

  const {updateOfferContext, filter} = useContext(OfferContext);

  const handleChange = (event) => {
    setEditFilter(event.target.value);
    setCategory(event.target.value);
    if (changeContext) {
      updateOfferContext('filter', event.target.value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleBlur = () => {
    setOpen(false);
  };


  //State
  const [categories, setCategories] = useState([]);

  //Service
  const categoryService = new CategoryService();

  //Context
  const {updateAlertContext} = useContext(AlertContext);

  //Component did mount
  useEffect(() => {
    (async () => {

      try {
        const res = await categoryService.getCategories();
        res.categories.unshift({'_id': '', 'name': 'All'});
        setCategories(res.categories)
      } catch (error) {
        updateAlertContext('errorContext', error.message);
      }
    })();

  }, []);

  return <div className="formik-select">

      <FormControl fullWidth>
        <InputLabel htmlFor="category">{label}</InputLabel>
        <Select
          name={name}
          id="category"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={filterProp || filterProp === '' ? editFilter : filter}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {
            categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>{sanitizedText(category.name)}</MenuItem>
            ))
          }
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>

  </div>
};

export default FormikSelect;
