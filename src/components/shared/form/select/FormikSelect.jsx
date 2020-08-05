import React, {useContext} from 'react';
import "./FormikSelect.scss"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {OfferContext} from "../../../../context/offer-context";

const FormikSelect = ({label, name, helperText, filterProp, disabled, changeContext}) => {

  const [category, setCategory] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [editFilter, setEditFilter] = React.useState(filterProp);

  const {updateOfferContext, offersPerPage, search, filter} = useContext(OfferContext);

  const handleChange = (event) => {
    setEditFilter(event.target.value);
    setCategory(event.target.value);
    if (changeContext) {
      updateOfferContext('filter', event.target.value);
    }
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleOpen = (event) => {
    setOpen(true);
  };

  const handleBlur = (event) => {
    console.log('on blur', event);
  };

  const items = [
    {
      value: '',
      category: 'All categories',
    },
    {
      value: 'Vehicles',
      category: 'Vehicles',
    },
    {
      value: 'Electronics & Appliances',
      category: 'Electronics & Appliances',
    },
    {
      value: 'Furniture & Decor',
      category: 'Furniture & Decor',
    },
    {
      value: 'Fashion & Beauty',
      category: 'Fashion & Beauty',
    },
    {
      value: 'Pets',
      category: 'Pets',
    },
    {
      value: 'Sports & Equipment',
      category: 'Sports & Equipment',
    },
    {
      value: 'Machines & Tools',
      category: 'Machines & Tools',
    },
    {
      value: 'Art & Books',
      category: 'Art & Books',
    },
    {
      value: 'Antiques',
      category: 'Antiques',
    },
  ];

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
          items.map((item) => (
            <MenuItem  key={item.value} value={item.value}>{item.category}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{helperText}</FormHelperText>

    </FormControl>
  </div>
};

export default FormikSelect;
