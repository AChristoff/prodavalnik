import React, {useContext} from 'react';
import "./FormikSelect.scss"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from "@material-ui/core/FormHelperText";
import {OfferContext} from "../../../../context/offer-context";

const FormikSelect = ({label, items}) => {

  const [category, setCategory] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  const {updateOfferContext, offersPerPage, search, filter} = useContext(OfferContext);

  const handleChange = (event) => {
    setCategory(event.target.value);
    updateOfferContext('filter', event.target.value);
    setRedirect(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return <div className="formik-select">
    <FormControl fullWidth>
      <InputLabel htmlFor="category-select">{label}</InputLabel>
      <Select
        id="category-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={category}
        onChange={handleChange}
      >
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
