import React, {useContext, useEffect} from 'react';
import './snackbar.scss'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {AlertContext} from "../../../context/alert-context";
import {AuthContext} from "../../../context/user-context";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarAlert({typeProp = '', messageProp = '', isOpen = false}) {

  const [open, setOpen] = React.useState(isOpen);
  const [message, setMessage] = React.useState(messageProp);
  const [type, setType] = React.useState(typeProp);
  const {errorContext, successContext, counter, updateAlertContext} = useContext(AlertContext);
  const {updateUserData} = useContext(AuthContext);

  const handleClose = () => {
    setOpen(false);
    updateAlertContext('counter', 0);
    updateAlertContext('isInfo', false);
    updateAlertContext('errorContext', '');
    updateAlertContext('successContext', '');
  };

  //Component did update
  useEffect(() => {
    if (successContext.length) {
      setMessage(successContext);
      setType('success');
      setOpen(true);
    } else if (errorContext.length) {
      setMessage(errorContext);
      setType('error');
      setOpen(true);
    }
  }, [counter, successContext, errorContext]);

  return (
    <div className="snackbar">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>{message}</Alert>
      </Snackbar>
    </div>
  );
}
