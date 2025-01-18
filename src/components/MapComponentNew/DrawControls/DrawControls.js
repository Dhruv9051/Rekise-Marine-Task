import React from "react";
/**
 * Renders a "Draw" button to open the modal for drawing.
 * The button is only shown when not actively drawing a line or polygon.
 */
const DrawControls = ({ isDrawingLine, isDrawingPolygon, setShowModalLine }) => {
  // Only show the button if not currently drawing
  const shouldShowButton = !isDrawingLine && !isDrawingPolygon;

  return (
    shouldShowButton && (
      <button
        onClick={() => setShowModalLine(true)} // Open the modal to start drawing
        className="draw-button"
      >
        Draw
      </button>
    )
  );
};

export default DrawControls;