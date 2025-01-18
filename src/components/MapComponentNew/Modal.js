import React from "react";
import WaypointTable from "./WaypointTable/WaypointTable";
import PolygonTable from "./PolygonTable/PolygonTable";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

/**
 * A modal component for managing waypoints and polygons.
 * Displays two modals: one for line drawing (waypoints) and one for polygon drawing.
 */
const Modal = ({
  showModalLine,
  showModalPolygon,
  waypoints,
  polygons,
  selected,
  selectedWaypointId,
  handleGenerateClick,
  handleImportClick,
  handleCloseClick,
  handleSelect,
  handleMenuClick,
  setShowModalPolygon,
  setShowModalLine,
}) => {
  return (
    <>
      {/* Modal for Line Drawing (Waypoints) */}
      {showModalLine && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{ height: waypoints.length > 0 ? "500px" : "200px" }}
          >
            <div className="modal-header">
              <h3 className="modal-title">Mission Creation</h3>
              <button onClick={handleCloseClick} className="close-button">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <h4 className="modal-subtitle">Waypoint Navigation</h4>
              {/* Render WaypointTable if waypoints exist */}
              {waypoints.length > 0 && (
                <WaypointTable
                  waypoints={waypoints}
                  polygons={polygons}
                  selected={selected}
                  handleSelect={handleSelect}
                  handleMenuClick={handleMenuClick}
                />
              )}
            </div>
            <p className="modal-description">
              Click on the map to mark points of the route and then press{" "}
              <kbd>↵</kbd> to complete the route.
            </p>
            <div className="modal-footer">
              <button onClick={handleGenerateClick} className="generate-button">
                Generate Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Polygon Drawing */}
      {showModalPolygon && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="polygon-modal-header">
              {/* Back button to return to the Waypoint modal */}
              <div
                className="back-button"
                onClick={() => {
                  setShowModalPolygon(false);
                  setShowModalLine(true);
                }}
              >
                <KeyboardArrowLeftIcon className="back-icon" />
                <p className="back-text">Mission Planner</p>
              </div>
              <h3 className="modal-title">Polygon Tool</h3>
            </div>
            <div className="modal-body">
              {/* Render PolygonTable if polygons exist for the selected waypoint */}
              {polygons[selectedWaypointId]?.length > 0 && (
                <PolygonTable
                  polygons={polygons}
                  selectedWaypointId={selectedWaypointId}
                />
              )}
            </div>
            <p className="modal-description">
              Click on the map to mark points of the polygon's perimeter and
              then press <kbd>↵</kbd> to close and complete the polygon.
            </p>
            <div className="modal-footer">
              {/* Discard button to close the polygon modal */}
              <button
                onClick={() => setShowModalPolygon(false)}
                className="discard-button"
              >
                Discard
              </button>
              {/* Import Points button to start drawing the polygon */}
              <button onClick={handleImportClick} className="generate-button">
                Import Points
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;