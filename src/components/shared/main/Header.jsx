import React, {useEffect} from 'react';
import Navigation from "./Navigation";
import {NavLink} from "react-router-dom";
import {Loyalty} from "@material-ui/icons";
import ThemeSwitch from "../switch/Switch";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const isTop = window.scrollY < 1;
      if (!isTop) {
        this.setState({scrolled: true});
      } else {
        this.setState({scrolled: false});
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll');
  }

  render() {
    return (

      <header className={this.state.scrolled ? 'app-header active' : 'app-header'}>

        <div className="wrapper">

          <NavLink to="/" className="header-logo">
            Prodavalnik <Loyalty/>
          </NavLink>

          <Navigation/>

          <ThemeSwitch/>

        </div>

      </header>
    );
  }
}

export default Header;
