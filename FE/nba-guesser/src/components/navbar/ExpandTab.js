import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./style.css";

export function ExpandTab(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const MenuItems = () => {
    return props.menuItems.map((item) => {
      return (
        <MenuItem onClick={handleClose}>
          <Link to={item.path}>{item.tabName}</Link>
        </MenuItem>
      );
    });
  };

  return (
    <div>
      <Button
        className="dropdown-button"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.title}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {MenuItems()}
      </Menu>
    </div>
  );
}
