import React, {useContext, useState, useEffect} from 'react';

import './App.scss';
import Header from "./components/shared/main/Header";
import Footer from "./components/shared/main/Footer";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import Main from "./components/shared/main/Main";
import {ThemeContext} from "./context/theme-context";
import {AlertContext} from "./context/alert-context";
import SnackbarAlert from "./components/shared/snackbar/Snackbar";
import Conditional from "./components/shared/Conditional";

export default function App() {
  const {errorContext, successContext} = useContext(AlertContext);
  const {isLightTheme} = useContext(ThemeContext);

  const [error, setError] = useState(errorContext);
  const [success, setSuccess] = useState(successContext);
  const [lightTheme, setLightTheme] = useState(true);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4AD295',
        contrastText: '#FFFFFF',
      },
      type: isLightTheme ? 'light' : 'dark',
    },
  });

  const message = successContext.length
    ? successContext
    : errorContext.length ? errorContext : '';

  //Component did update
  useEffect(() => {
    setLightTheme(isLightTheme)
  }, [lightTheme]);

  return (
    <div className={isLightTheme ? 'app light' : 'app dark'}>
      <ThemeProvider theme={theme}>

        <Header/>
        <Main/>
        <Footer/>

        <Conditional if={successContext.length}>
          <SnackbarAlert type="success" message={successContext} isOpen={true}/>
        </Conditional>

        <Conditional if={errorContext.length}>
          <SnackbarAlert type="error" message={errorContext} isOpen={true}/>
        </Conditional>

      </ThemeProvider>
    </div>
  );
}