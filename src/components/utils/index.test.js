import {
    calculateDistance,
    calculatePolygonPerimeter,
    formatCoordinate,
  } from "./index";
  
  describe("Utility Functions", () => {
    describe("calculateDistance", () => {
      it("should calculate the distance between two coordinates", () => {
        const coord1 = [0, 0];
        const coord2 = [3, 4];
        expect(calculateDistance(coord1, coord2)).toBe("5.00"); // 3-4-5 triangle
      });
  
      it("should return 0 for the same coordinates", () => {
        const coord1 = [5, 5];
        const coord2 = [5, 5];
        expect(calculateDistance(coord1, coord2)).toBe("0.00");
      });
  
      it("should handle negative coordinates", () => {
        const coord1 = [-1, -1];
        const coord2 = [2, 3];
        expect(calculateDistance(coord1, coord2)).toBe("5.00");
      });
    });
  
    describe("calculatePolygonPerimeter", () => {
      it("should calculate the perimeter of a triangle", () => {
        const coordinates = [
          [0, 0],
          [3, 0],
          [3, 4],
        ];
        expect(calculatePolygonPerimeter(coordinates)).toBe("12.00"); // 3 + 4 + 5
      });
  
      it("should calculate the perimeter of a square", () => {
        const coordinates = [
          [0, 0],
          [4, 0],
          [4, 4],
          [0, 4],
        ];
        expect(calculatePolygonPerimeter(coordinates)).toBe("16.00"); // 4 sides of length 4
      });
  
      it("should handle a single-point polygon", () => {
        const coordinates = [[0, 0]];
        expect(calculatePolygonPerimeter(coordinates)).toBe("0.00"); // No perimeter
      });
    });
  
    describe("formatCoordinate", () => {
      it("should format a coordinate in the northern and eastern hemisphere", () => {
        const coord = [77.12345678, 28.98765432];
        expect(formatCoordinate(coord)).toBe("28.98765432° N, 77.12345678° E");
      });
  
      it("should format a coordinate in the southern and western hemisphere", () => {
        const coord = [-77.12345678, -28.98765432];
        expect(formatCoordinate(coord)).toBe("28.98765432° S, 77.12345678° W");
      });
  
      it("should handle coordinates at the equator and prime meridian", () => {
        const coord = [0, 0];
        expect(formatCoordinate(coord)).toBe("0.00000000° N, 0.00000000° E");
      });
    });
  });