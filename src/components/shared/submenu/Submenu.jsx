import React from 'react';
import './submenu.scss'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {AccountCircle, Add, Beenhere, ExitToApp, LocalOffer, Settings, Star, Category, Menu as MenuIcon} from "@material-ui/icons";
import {NavLink} from "react-router-dom";

export default function Submenu({username, role}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isAdmin = role === 'Admin';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <li>
      <Button className="submenu-btn" aria-controls="nav-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon className="burger-menu"/>
        <AccountCircle className="user-menu"/>
        <span className="greeter">{username}</span>
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

        {
          isAdmin
            ? <MenuItem onClick={handleClose}>
              <NavLink to="/offers/approval" exact>
                <Beenhere className="submenu-icon"/>Offer Approval
              </NavLink>
            </MenuItem>
            : null
        }

        {
          isAdmin
            ? <MenuItem onClick={handleClose}>
              <NavLink to="/categories" exact>
                <Category className="submenu-icon"/>Categories
              </NavLink>
            </MenuItem>
            : null
        }

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
          <NavLink to="/user/favorites" exact>
            <Star className="submenu-icon"/> Favorites
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

