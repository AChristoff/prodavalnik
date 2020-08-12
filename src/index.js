import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import ThemeContextProvider from "./context/theme-context";
import OfferContextProvider from "./context/offer-context";
import AuthContextProvider from "./context/user-context";
import AlertContextProvider from "./context/alert-context";

ReactDOM.render(
  <ThemeContextProvider>
    <OfferContextProvider>
      <AuthContextProvider>
        <AlertContextProvider>

          <Router>

            <App/>

          </Router>

        </AlertContextProvider>
      </AuthContextProvider>
    </OfferContextProvider>
  </ThemeContextProvider>,

  document.getElementById('root')
);

