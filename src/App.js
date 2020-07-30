import React from 'react';

import './App.scss';
import Header from "./components/shared/main/Header";
import Footer from "./components/shared/main/Footer";
import {ThemeContext} from "./context/theme-context";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import Main from "./components/shared/main/Main";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightTheme: true
    }
  }

  static contextType = ThemeContext;

  render() {

    const {isLightTheme} = this.context;

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#4AD295',
          contrastText: '#FFFFFF',
        },
        type: isLightTheme ? 'light' : 'dark',
      },
    });


    return (
      <div className={isLightTheme ? 'app light' : 'app dark'}>
        <ThemeProvider theme={theme}>

        <Header/>
        <Main/>
        <Footer/>

        </ThemeProvider>
      </div>
    );
  }

  async componentDidUpdate(prevProps, prevState) {

    const {lightTheme} = this.state;
    const {isLightTheme} = this.context;


    if (lightTheme !== isLightTheme) {
      this.setState({
        lightTheme: isLightTheme,
      })
    }
  }
}

export default App;
