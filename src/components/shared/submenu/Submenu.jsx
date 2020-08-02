import React from 'react';
import './submenu.scss'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {AccountCircle, Add, ExitToApp, LocalOffer, Settings} from "@material-ui/icons";
import {NavLink} from "react-router-dom";

export default function Submenu({username}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <li>
      <Button className="submenu-btn" aria-controls="nav-menu" aria-haspopup="true" onClick={handleClick}>
        <span className="greeter">Hello {username},</span><AccountCircle/>
      </Button>
      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        className="submenu-list"
      >
        <MenuItem onClick={handleClose}>
          <NavLink to="/offers/create" exact>
            <Add className="submenu-icon"/>Add Offer
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/user/offers" exact>
            <LocalOffer className="submenu-icon"/> My Offers
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/user/profile" exact>
            <Settings className="submenu-icon"/>Profile
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/user/logout" exact>
            <ExitToApp className="submenu-icon"/>Logout
          </NavLink>
        </MenuItem>
      </Menu>
    </li>
  );
}

