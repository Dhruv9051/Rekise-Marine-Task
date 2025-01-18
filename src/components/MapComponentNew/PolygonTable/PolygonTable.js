import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

/**
 * A table component to display polygon data for a selected waypoint.
 * Shows the polygon ID, coordinates, and distance.
 */
const PolygonTable = ({ polygons, selectedWaypointId }) => {
  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell>WP</TableCell> {/* Waypoint/Polygon ID */}
              <TableCell>Coordinates</TableCell> {/* Polygon Coordinates */}
              <TableCell>Distance (m)</TableCell> {/* Polygon Perimeter */}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {/* Render rows for each polygon in the selected waypoint */}
            {polygons[selectedWaypointId]?.map((polygon) => (
              <TableRow key={polygon.id}>
                {/* Polygon ID */}
                <TableCell>{String(polygon.id).padStart(2, "0")}</TableCell>

                {/* Polygon Coordinates */}
                <TableCell>{polygon.coordinates.join("; ")}</TableCell>

                {/* Polygon Perimeter */}
                <TableCell>{polygon.distance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PolygonTable;
