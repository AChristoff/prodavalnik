import React from 'react';

import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from '@material-ui/icons/MailOutline';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";


export default function Login() {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div className="wrapper login">
      <h2>Login</h2>

      <p>
        <FormControl required>
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input
            id="standard-adornment-password"
            placeholder="Ex. john@mail.com"
            type="text"
            value={values.email}
            endAdornment={
              <InputAdornment position="end">
                  <MailOutline/>
              </InputAdornment>
            }
          />
        </FormControl>
      </p>

      <p>
        <FormControl required>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </p>

      <Button variant="contained" size="large" color="primary">Login</Button>
    </div>
  );
}
