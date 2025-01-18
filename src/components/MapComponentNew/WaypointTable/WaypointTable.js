import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

/**
 * A table component to display waypoints and their associated polygons.
 * Allows selection of waypoints and provides actions for each waypoint.
 */
const WaypointTable = ({
  waypoints,
  polygons,
  selected,
  handleSelect,
  handleMenuClick,
}) => {
  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {/* Checkbox for selecting all waypoints */}
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < waypoints.length
                  }
                  checked={
                    waypoints.length > 0 && selected.length === waypoints.length
                  }
                  onChange={(event) => {
                    if (event.target.checked) {
                      handleSelect(waypoints.map((wp) => wp.id)); // Select all
                    } else {
                      handleSelect([]); // Deselect all
                    }
                  }}
                />
              </TableCell>
              <TableCell>WP</TableCell> {/* Waypoint ID */}
              <TableCell>Coordinates</TableCell> {/* Waypoint Coordinates */}
              <TableCell>Distance (m)</TableCell>{" "}
              {/* Distance from previous waypoint */}
              <TableCell>Actions</TableCell> {/* Actions menu */}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {/* Render rows for each waypoint */}
            {waypoints.map((wp, index) => (
              <TableRow key={wp.id}>
                {/* Checkbox for selecting the current waypoint */}
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(wp.id) !== -1}
                    onChange={() => handleSelect(wp.id)}
                  />
                </TableCell>

                {/* Waypoint ID */}
                <TableCell>{String(index).padStart(2, "0")}</TableCell>

                {/* Waypoint Coordinates or Polygon Label */}
                <TableCell>
                  {polygons[wp.id]?.length > 0
                    ? `Polygon ${String(index).padStart(2, "0")}`
                    : wp.coordinates}
                </TableCell>

                {/* Distance from the previous waypoint */}
                <TableCell>{wp.distance}</TableCell>

                {/* Actions Menu */}
                <TableCell>
                  <IconButton
                    onClick={(event) =>
                      handleMenuClick(event, wp.id, "waypoint")
                    }
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WaypointTable;
