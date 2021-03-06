import React, {Component, createContext} from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    isLightTheme: true,
  };

  updateThemeContext = (key, value) => {
    this.setState({[key]: value})
  };

  render() {
    return (
      <ThemeContext.Provider value={{...this.state, updateThemeContext: this.updateThemeContext}}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;
