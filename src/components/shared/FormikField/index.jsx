import React from 'react';
import TextField from "@material-ui/core/TextField";
import {ErrorMessage, Field} from "formik";
import "./FormikField.scss"
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle, MailOutline, Visibility, VisibilityOff} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

export default function FormikField({name, label, type="text", icon}) {

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function getIcon(icon) {
    if (icon === 'email') {
      return  <MailOutline/>;
    }

    if (icon === 'username') {
      return <AccountCircle />;
    }

    if (icon === 'password') {
      return <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {values.showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>;
    }

    return null;
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
        name={name}
        label={label}
        type={getType(type)}
        helperText={<ErrorMessage className="error-msg" name={name}/>}
        required
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
