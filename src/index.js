import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import theme from "./theme";
import {ThemeProvider} from  '@material-ui/core/styles'

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
