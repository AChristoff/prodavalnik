import React, {useContext, useState, useEffect} from 'react';

import './App.scss';
import Header from "./components/shared/main/Header";
import Footer from "./components/shared/main/Footer";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import Main from "./components/shared/main/Main";
import {ThemeContext} from "./context/theme-context";
import {AuthContext} from "./context/user-context";
import SnackbarAlert from "./components/shared/snackbar/Snackbar";
import jwt_decode from "jwt-decode";

export default function App() {
  const {isLightTheme} = useContext(ThemeContext);
  const {updateUserContext} = useContext(AuthContext);
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

   //Component did mount
   useEffect(() => {
     isTokenExpired();
   },[])

  //Component did update
  useEffect(() => {
    setLightTheme(isLightTheme)
  }, [lightTheme]);

  const isTokenExpired = () => {
    const token = window.localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();
    
    updateUserContext('isAuth', !isTokenExpired)
  };

  return (
    <div className={isLightTheme ? 'app light' : 'app dark'}>
      <ThemeProvider theme={theme}>

        <Header/>
        <Main/>
        <Footer/>

        <SnackbarAlert/>

      </ThemeProvider>
    </div>
  );
}