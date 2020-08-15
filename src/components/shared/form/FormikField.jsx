import React, {useContext, useEffect} from 'react';
import "./FormikField.scss"
import TextField from "@material-ui/core/TextField";
import {ErrorMessage, Field} from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {
  AccountCircle,
  Image,
  LocalOffer,
  MailOutline, Phone,
  Search,
  TextFields,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";
import {AuthContext} from "../../../context/user-context";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialRegex = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/;

export default function FormikField({
                                      name,
                                      label,
                                      type = "text",
                                      placeholder = '',
                                      icon,
                                      disabled = false,
                                      required = false,
                                      multiline = false,
                                      strengthBar = false,
                                      rows = 1,
                                      className = '',
                                      fieldStyle = "standard"}) {

  //Context
  const {updateUserContext} = useContext(AuthContext);

  //Component will unmount
  useEffect(() => {
    return () => {
      updateUserContext('passLevel', 0)
    }
  }, []);

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

  const handleInput = (e) => {
    let value = e.target.value;

    if (value.match(lowercaseRegex)
      && value.match(uppercaseRegex)
      && value.match(numericRegex)
      && value.match(specialRegex)
    ) {

      if (value.length >= 16) {
        updateUserContext('passLevel', 100);
      } else if (value.length >= 13) {
        updateUserContext('passLevel', 75);
      } else if (value.length >= 9) {
        updateUserContext('passLevel', 50);
      } else if (value.length >= 6) {
        updateUserContext('passLevel', 25);
      } else if (!value.length) {
        updateUserContext('passLevel', 0);
      }
    } else {
      updateUserContext('passLevel', 0);
    }
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
      case 'phone':
        return <Phone/>;
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
        {...(strengthBar && {onInput: handleInput})}
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
