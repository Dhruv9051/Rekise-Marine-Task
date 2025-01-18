/**
 * Calculates the distance between two coordinates using the Euclidean formula.
 */
export const calculateDistance = (coord1, coord2) => {
  const dx = coord2[0] - coord1[0]; // Difference in x-axis
  const dy = coord2[1] - coord1[1]; // Difference in y-axis
  return Math.sqrt(dx * dx + dy * dy).toFixed(2); // Distance rounded to 2 decimal places
};

/**
 * Calculates the perimeter of a polygon by summing the distances between its vertices.
 */
export const calculatePolygonPerimeter = (coordinates) => {
  let perimeter = 0;

  // Sum distances between consecutive points
  for (let i = 0; i < coordinates.length - 1; i++) {
    perimeter += parseFloat(calculateDistance(coordinates[i], coordinates[i + 1]));
  }

  // Close the polygon by adding the distance between the last and first point
  perimeter += parseFloat(calculateDistance(coordinates[coordinates.length - 1], coordinates[0]));

  return perimeter.toFixed(2); // Perimeter rounded to 2 decimal places
};

/**
 * Formats a coordinate into a readable string with direction (N/S, E/W).
 */
export const formatCoordinate = (coord) => {
  const lat = Math.abs(coord[1]).toFixed(8); // Latitude value
  const lon = Math.abs(coord[0]).toFixed(8); // Longitude value
  const latDir = coord[1] >= 0 ? "N" : "S"; // Latitude direction
  const lonDir = coord[0] >= 0 ? "E" : "W"; // Longitude direction
  return `${lat}${"\u00b0"} ${latDir}, ${lon}${"\u00b0"} ${lonDir}`; // Formatted string
};