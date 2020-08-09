import React from 'react';
import "./FormikField.scss"
import TextField from "@material-ui/core/TextField";
import {ErrorMessage, Field} from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {
  AccountCircle,
  Image,
  LocalOffer,
  MailOutline,
  Search,
  TextFields,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";

export default function FormikField({name, label, type = "text", placeholder = '', icon, disabled = false, required = false , multiline = false, rows = 1, className='', fieldStyle = "standard"} ) {

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSearch = (event) => {
    console.log(event);
  };

  function getIcon(icon) {
    switch (icon) {
      case 'email':
        return <MailOutline/>;
      case 'username':
        return <AccountCircle/>;
      case 'text':
        return <TextFields/>;
      case 'image':
        return <Image/>;
      case 'price':
        return <LocalOffer/>;
      case 'password':
        return <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
          {values.showPassword ? <Visibility/> : <VisibilityOff/>}
        </IconButton>;
      case 'search':
        return <IconButton id={'search-btn'} type="submit" onClick={handleSearch}>
          <Search/>
        </IconButton>;
      default:
        return null;
    }
  }

  function getType(type) {
    if (type === 'password') {
      return values.showPassword ? 'text' : 'password';
    } else {
      return type;
    }
  }


  return (
    <div className="formik-field">
      <Field
        as={TextField}
        multiline={multiline}
        rows={rows}
        name={name}
        required={required}
        label={label}
        type={getType(type)}
        className={className}
        helperText={<ErrorMessage className="error-msg" name={name}/>}
        placeholder={placeholder}
        disabled={disabled}
        variant={fieldStyle}
        fullWidth
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {getIcon(icon)}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
