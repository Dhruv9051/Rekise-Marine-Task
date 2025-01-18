import React from "react";
import { render, screen } from "@testing-library/react";
import WaypointTable from "./WaypointTable";

describe("WaypointTable", () => {
  const waypoints = [
    { id: 1, coordinates: "0, 0", distance: "--" },
    { id: 2, coordinates: "3, 4", distance: "5.00" },
  ];

  it("should render waypoints in the table", () => {
    render(
      <WaypointTable
        waypoints={waypoints}
        polygons={{}}
        selected={[]}
        handleSelect={() => {}}
        handleMenuClick={() => {}}
      />
    );
    const waypoint1 = screen.getByText("00");
    const waypoint2 = screen.getByText("01");
    expect(waypoint1).toBeInTheDocument();
    expect(waypoint2).toBeInTheDocument();
  });
});