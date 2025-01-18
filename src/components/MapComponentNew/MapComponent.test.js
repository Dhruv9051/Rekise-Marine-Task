import React from "react";
import { render, screen } from "@testing-library/react";
import MapComponent from "./MapComponent";

describe("MapComponent", () => {
  it("should render the map container", () => {
    render(<MapComponent />);
    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();
  });

  it("should render the DrawControls component", () => {
    render(<MapComponent />);
    const drawButton = screen.getByText("Draw");
    expect(drawButton).toBeInTheDocument();
  });
});