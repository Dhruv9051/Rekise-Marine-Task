import React, { useCallback, useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { fromLonLat } from "ol/proj";
import { Draw } from "ol/interaction";
import DrawControls from "./DrawControls/DrawControls";
import Modal from "./Modal";
import MenuActions from "./MenuActions";
import {
  calculateDistance,
  calculatePolygonPerimeter,
  formatCoordinate,
} from "../utils/index";
import "./MapComponent.css";

/**
 * Main MapComponent that renders the map and handles drawing interactions.
 * Manages linestrings, polygons, and modal states for drawing lines and polygons.
 */
const MapComponent = () => {
  // Refs for map and vector source
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const sourceRef = useRef(new VectorSource());

  // State for drawing interactions
  const [drawInteractionLine, setDrawInteractionLine] = useState(null);
  const [drawInteractionPolygon, setDrawInteractionPolygon] = useState(null);

  // State for waypoints and polygons
  const [waypoints, setWaypoints] = useState([]);
  const [polygons, setPolygons] = useState({});

  // State for drawing modes and modals
  const [isDrawingLine, setIsDrawingLine] = useState(false);
  const [isDrawingPolygon, setIsDrawingPolygon] = useState(false);
  const [showModalLine, setShowModalLine] = useState(false);
  const [showModalPolygon, setShowModalPolygon] = useState(false);

  // State for selected waypoints and menu
  const [selected, setSelected] = useState([]);
  const [selectedWaypointId, setSelectedWaypointId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Initialize the map
  useEffect(() => {
    const map = new Map({
      target: mapContainerRef.current,
      layers: [
        new TileLayer({ source: new OSM({ attributions: ['<h2>© Dhruv</h2>']}) }), // Base map layer
        new VectorLayer({ source: sourceRef.current }), // Vector layer for drawings
      ],
      view: new View({ center: fromLonLat([73.120399, 19.002239]), zoom: 18 }), // Default view
    });
    mapRef.current = map;

    // Cleanup on unmount
    return () => map.setTarget(undefined);
  }, []);

  /**
   * Registers coordinates for a line and updates the waypoints state.
   */
  const registerCoordinatesForLine = useCallback(
    (coordinates) => {
      const newWaypoints = coordinates.map((coord, index) => ({
        id: waypoints.length + index,
        coordinates: coord.map((c) => c.toFixed(6)).join(", "),
        distance:
          index === 0 ? "--" : calculateDistance(coordinates[index - 1], coord),
      }));
      setWaypoints((prev) => [...prev, ...newWaypoints]);
    },
    [waypoints.length]
  );

  /**
   * Registers coordinates for a polygon and updates the polygons state.
   */
  const registerCoordinatesForPolygon = useCallback(
    (coordinates, waypointId) => {
      const formattedCoordinates = coordinates[0].map((coord) =>
        formatCoordinate(coord)
      );
      const perimeter = calculatePolygonPerimeter(coordinates[0]);
      const newPolygon = {
        id: polygons[waypointId] ? polygons[waypointId].length + 1 : 1,
        coordinates: formattedCoordinates,
        distance: perimeter,
      };

      setPolygons((prev) => ({
        ...prev,
        [waypointId]: [...(prev[waypointId] || []), newPolygon],
      }));
    },
    [polygons]
  );

  /**
   * Starts drawing a line on the map.
   */
  const startDrawingLine = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    if (drawInteractionLine) map.removeInteraction(drawInteractionLine);

    const draw = new Draw({
      source: sourceRef.current,
      type: "LineString",
      freehand: false,
    });

    map.addInteraction(draw);
    setDrawInteractionLine(draw);
    setIsDrawingLine(true);

    draw.on("drawstart", () => setIsDrawingLine(true));
    draw.on("drawend", (event) => {
      const lineString = event.feature.getGeometry();
      registerCoordinatesForLine(lineString.getCoordinates());
      setIsDrawingLine(false);
    });
  }, [drawInteractionLine, registerCoordinatesForLine]);

  /**
   * Starts drawing a polygon on the map.
   */
  const startDrawingPolygon = useCallback(
    (waypointId) => {
      const map = mapRef.current;
      if (!map) return;

      if (drawInteractionPolygon) map.removeInteraction(drawInteractionPolygon);

      const draw = new Draw({
        source: sourceRef.current,
        type: "Polygon",
        freehand: false,
      });

      map.addInteraction(draw);
      setDrawInteractionPolygon(draw);
      setIsDrawingPolygon(true);

      draw.on("drawstart", () => setIsDrawingPolygon(true));
      draw.on("drawend", (event) => {
        const polygon = event.feature.getGeometry();
        registerCoordinatesForPolygon(polygon.getCoordinates(), waypointId);
        setIsDrawingPolygon(false);
      });
    },
    [drawInteractionPolygon, registerCoordinatesForPolygon]
  );

  /**
   * Finalizes the current drawing interaction (line or polygon).
   */
  const finalizeDrawing = useCallback(() => {
    const map = mapRef.current;
    if (drawInteractionLine) {
      drawInteractionLine.finishDrawing();
      map.removeInteraction(drawInteractionLine);
      setDrawInteractionLine(null);
      setIsDrawingLine(false);
    }
    if (drawInteractionPolygon) {
      drawInteractionPolygon.finishDrawing();
      map.removeInteraction(drawInteractionPolygon);
      setDrawInteractionPolygon(null);
      setIsDrawingPolygon(false);
    }
  }, [drawInteractionLine, drawInteractionPolygon]);

  /**
   * Handles keydown events for finalizing or canceling drawing.
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        finalizeDrawing();
      } else if (event.key === "Escape") {
        const map = mapRef.current;
        if (drawInteractionLine) {
          map.removeInteraction(drawInteractionLine);
          setDrawInteractionLine(null);
          setIsDrawingLine(false);
        }
        if (drawInteractionPolygon) {
          map.removeInteraction(drawInteractionPolygon);
          setDrawInteractionPolygon(null);
          setIsDrawingPolygon(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawInteractionLine, drawInteractionPolygon, finalizeDrawing]);

  return (
    <div ref={mapContainerRef} className="map-container">
      {/* Draw Controls */}
      <DrawControls
        isDrawingLine={isDrawingLine}
        isDrawingPolygon={isDrawingPolygon}
        setShowModalLine={setShowModalLine}
      />

      {/* Modal for Line and Polygon Drawing */}
      <Modal
        showModalLine={showModalLine}
        showModalPolygon={showModalPolygon}
        waypoints={waypoints}
        polygons={polygons}
        selected={selected}
        selectedWaypointId={selectedWaypointId}
        handleGenerateClick={() => {
          setShowModalLine(false);
          startDrawingLine();
        }}
        handleImportClick={() => {
          if (selectedWaypointId === null) return;
          setShowModalPolygon(false);
          startDrawingPolygon(selectedWaypointId);
        }}
        handleCloseClick={() => setShowModalLine(false)}
        handleSelect={(id) => {
          const selectedIndex = selected.indexOf(id);
          let newSelected = selectedIndex === -1
            ? [...selected, id]
            : selected.filter((selectedId) => selectedId !== id);
          setSelected(newSelected);
        }}
        handleMenuClick={(event, id) => {
          setAnchorEl(event.currentTarget);
          setSelectedWaypointId(id);
        }}
        setShowModalPolygon={setShowModalPolygon}
        setShowModalLine={setShowModalLine}
      />

      {/* Menu Actions for Waypoints */}
      <MenuActions
        anchorEl={anchorEl}
        handleMenuClose={() => setAnchorEl(null)}
        handleInsertBefore={() => {
          setShowModalLine(false);
          setShowModalPolygon(true);
          setAnchorEl(null);
        }}
        handleInsertAfter={() => {
          setShowModalLine(false);
          setShowModalPolygon(true);
          setAnchorEl(null);
        }}
      />
    </div>
  );
};

export default MapComponent;