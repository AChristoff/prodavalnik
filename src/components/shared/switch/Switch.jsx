import React from 'react';
import Switch from "@material-ui/core/Switch";
import './switch.scss'
import {ThemeContext} from "../../../context/theme-context";
import {Brightness4, Brightness5, Brightness7} from "@material-ui/icons";

class ThemeSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
    };
  }

  static contextType = ThemeContext;

  handleChange = (event) => {
    this.setState({
        ...this.state,
        [event.target.name]: event.target.checked
      }
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
        icon={<Brightness4/>}
        checkedIcon={<Brightness7/>}
        onChange={this.handleChange}
        color="primary"
        name="checkedA"
      />
    );
  }
}

export default ThemeSwitch;
