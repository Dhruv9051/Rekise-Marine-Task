import { useState, useEffect } from "react";
/**
 * Tracks and returns the current window size (width and height).
 * Uses a debounced resize event to optimize performance.
 */
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    innerWidth: window.innerWidth, // Current window width
    innerHeight: window.innerHeight, // Current window height
  });

  useEffect(() => {
    // Update window size on resize
    const handleResize = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };

    // Debounce the resize handler to avoid excessive updates
    const debouncedResize = debounce(handleResize, 100);

    window.addEventListener("resize", debouncedResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  return windowSize;
};

/**
 * Debounces a function to limit how often it's called.
 * Useful for performance optimization in events like resizing.
 */
const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId); // Clear previous timeout
    timeoutId = setTimeout(() => func.apply(this, args), delay); // Set new timeout
  };
};

export default useWindowSize;