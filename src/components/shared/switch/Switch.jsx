import React from 'react';
import Switch from "@material-ui/core/Switch";
import './switch.scss'
import {ThemeContext} from "../../../context/theme-context";

class ThemeSwitch extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
    };
  }

  static contextType = ThemeContext;

    handleChange = (event) => {
      console.log(event.target.name);
      console.log(event.target.checked);
   this.setState({
     ...this.state,
     [event.target.name]: event.target.checked }
     );

    let {isLightTheme, updateThemeContext} = this.context;
    isLightTheme = !isLightTheme;
    updateThemeContext('isLightTheme', isLightTheme);
  };

  render() {
    const {isLightTheme} = this.context;

    return (
      <Switch
        className="theme-switch"
        checked={isLightTheme}
        onChange={this.handleChange}
        color="primary"
        name="checkedA"
      />
    );
  }
}

export default ThemeSwitch;
