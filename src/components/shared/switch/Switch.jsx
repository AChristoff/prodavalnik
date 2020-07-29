import React from 'react';
import Switch from "@material-ui/core/Switch";
import './switch.scss'
import {ThemeContext} from "../../../context/theme-context";

class ThemeSwitch extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
      checkedB: true,
    };
  }

  static contextType = ThemeContext;

    handleChange = (event) => {
   this.setState({
     ...this.state,
     [event.target.name]: event.target.checked }
     );

    let {isLightTheme, updateThemeContext} = this.context;
    isLightTheme = !isLightTheme;
    updateThemeContext('isLightTheme', isLightTheme);
  };

  render() {

    return (
      <Switch
        className="theme-switch"
        checked={this.state.checkedA}
        onChange={this.handleChange}
        color="primary"
        name="checkedA"
        inputProps={{'aria-label': 'primary checkbox'}}
      />
    );
  }
}

export default ThemeSwitch;
