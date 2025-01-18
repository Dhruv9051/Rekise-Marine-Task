import React from "react";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

/**
 * A context menu for inserting polygons before or after a selected linestring.
 * Displays two options: "Insert Polygon Before" and "Insert Polygon After".
 */
const MenuActions = ({ anchorEl, handleMenuClose, handleInsertBefore, handleInsertAfter }) => {
  return (
    <Menu
      anchorEl={anchorEl} // Anchor element for the menu
      open={Boolean(anchorEl)} // Open the menu if anchorEl is set
      onClose={handleMenuClose} // Close the menu when an option is selected or clicked outside
      style={{ zIndex: 3000 }} // Ensure the menu appears above other elements
    >
      {/* Option to insert a polygon before the selected linestring */}
      <MenuItem onClick={handleInsertBefore}>
        <KeyboardArrowLeftIcon className="menu-icon" /> Insert Polygon Before
      </MenuItem>

      {/* Option to insert a polygon after the selected linestring */}
      <MenuItem onClick={handleInsertAfter}>
        <KeyboardArrowRightIcon className="menu-icon" /> Insert Polygon After
      </MenuItem>
    </Menu>
  );
};

export default MenuActions;