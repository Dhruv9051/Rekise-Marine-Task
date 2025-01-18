import React from "react";
import { render, screen } from "@testing-library/react";
import DrawControls from "./DrawControls";

describe("DrawControls", () => {
  it("should render the Draw button when not drawing", () => {
    render(
      <DrawControls
        isDrawingLine={false}
        isDrawingPolygon={false}
        setShowModalLine={() => {}}
      />
    );
    const drawButton = screen.getByText("Draw");
    expect(drawButton).toBeInTheDocument();
  });

  it("should not render the Draw button when drawing", () => {
    render(
      <DrawControls
        isDrawingLine={true}
        isDrawingPolygon={false}
        setShowModalLine={() => {}}
      />
    );
    const drawButton = screen.queryByText("Draw");
    expect(drawButton).not.toBeInTheDocument();
  });
});