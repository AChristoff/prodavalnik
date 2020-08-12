import React, {useContext, useEffect} from 'react';
import './snackbar.scss'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {AlertContext} from "../../../context/alert-context";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarAlert({type = 'success', message = '', isOpen = false}) {

  const [open, setOpen] = React.useState(isOpen);
  const {counter, updateAlertContext} = useContext(AlertContext);

  const handleClose = () => {
    setOpen(false);
    updateAlertContext('counter', 0);
    updateAlertContext('isInfo', false);
    updateAlertContext('errorContext', '');
    updateAlertContext('successContext', '');
  };

  //Component did update
  useEffect(() => {
    if (counter !== 0) {
      setOpen(true);
    }
  }, [counter]);

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
