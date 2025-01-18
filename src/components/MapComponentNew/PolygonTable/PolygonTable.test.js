import React from "react";
import { render, screen } from "@testing-library/react";
import PolygonTable from "./PolygonTable";

describe("PolygonTable", () => {
  const polygons = {
    1: [
      { id: 1, coordinates: ["28.98765432° N, 77.12345678° E"], distance: "12.00" },
    ],
  };

  it("should render polygons in the table", () => {
    render(
      <PolygonTable polygons={polygons} selectedWaypointId={1} />
    );
    const polygonRow = screen.getByText("28.98765432° N, 77.12345678° E");
    expect(polygonRow).toBeInTheDocument();
  });
});