import React from 'react';

import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import {Search} from "@material-ui/icons";
import {requester} from "../../../../services/offers";

export default function Jumbotron() {
  const res = requester.getOffers(1, 4, '', '', 'dog', '?subtitle=Doodle');
  console.log(res);

  const [values] = React.useState({
    search: '',
  });

  return (
    <div className="jumbotron">
      <div className="wrapper">
        <form className="search-from">
          <h1>Buy <span>&</span> sell <span>online!</span></h1>

          <FormControl className="search">
            <InputLabel htmlFor="search">Search</InputLabel>
            <Input
              id="search"
              placeholder="..."
              type="text"
              value={values.search}
              endAdornment={
                <InputAdornment position="end">
                  <Search/>
                </InputAdornment>
              }
            />
          </FormControl>


        </form>
      </div>
    </div>
  );
}
