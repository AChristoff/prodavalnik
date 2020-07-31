import React, {useContext} from 'react';
import "./FormikSelect.scss"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from "@material-ui/core/FormHelperText";
import {OfferContext} from "../../../../context/offer-context";

const FormikSelect = ({label, name, helperText, filterProp}) => {

  const [category, setCategory] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [currentFilter, setCurrentFilter] = React.useState('');

  const {updateOfferContext, offersPerPage, search, filter} = useContext(OfferContext);

  const handleChange = (event) => {
    setCurrentFilter(event.target.value);
    setCategory(event.target.value);
    if (!filterProp) {
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

  console.log(label);
  console.log(filterProp);
  console.log(currentFilter);

  return <div className="formik-select">
    <FormControl fullWidth>
      <InputLabel htmlFor="category-select">{label}</InputLabel>
      <Select
        name={name}
        id="category-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={filterProp ? currentFilter : filter}
        onBlur={handleBlur}
        onChange={handleChange}
      >
        {
          items.map((item) => (
            <MenuItem key={item.value} value={item.value}>{item.category}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{helperText}</FormHelperText>

    </FormControl>
  </div>
};

export default FormikSelect;
