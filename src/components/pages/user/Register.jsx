import React from 'react';

import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from '@material-ui/icons/MailOutline';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";


export default function Register() {
  const [values, setValues] = React.useState({
    email: '',
  });

  return (
    <div className="wrapper register">
      <h2>Register</h2>

      <form className="register-from">

        <p>
          <FormControl required className="email">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
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

        <Button variant="contained" size="large" color="primary">Register</Button>

      </form>

    </div>
  );
}
