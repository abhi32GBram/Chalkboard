// Importing necessary types and utilities
import { Camera, Color, Point, Side, XYWH } from "@/types/canvas"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Defining a constant array of colors to be used for different connections
const COLOR = [
  "#0000FF", // Blue
  "#a33993", // Purple
  "#33827e", // Teal
  "#441b82", // Dark Blue
  "#FF0000", // Red
]

// Utility function to merge class names using clsx and twMerge for Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to map a connection ID to a color from the COLOR array
export function connectionIdToColor(connectionId: number): string {
  // Using modulo to cycle through the COLOR array
  return COLOR[connectionId % COLOR.length]
}

// Function to convert a pointer event to a canvas point, taking into account the camera's position
export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  // Calculating the canvas point by subtracting the camera's position from the event's client coordinates
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y
  }
}

// This function converts a Color object into a CSS-compatible color string.
// It takes a Color object as input, which contains red, green, and blue color values.
// Each color value is converted to a hexadecimal string and concatenated to form a CSS color string.
export function colorToCSS(color: Color) {
  // Convert the red, green, and blue values to hexadecimal strings.
  // The toString(16) method converts the number to a hexadecimal string.
  // The padStart(2, "0") method ensures that each hexadecimal string is at least 2 characters long,
  // padding with zeros if necessary.
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`
}

// Function to resize the bounds of an object based on the corner being dragged and the new point.
export function resizeBounds(
  bounds: XYWH, // The initial bounds of the object.
  corner: Side, // The corner being dragged for resizing.
  point: Point // The new point to resize the object to.
): XYWH {
  // Initialize a result object with the initial bounds.
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  // If the left corner is being dragged, adjust the x position and width accordingly.
  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  // If the right corner is being dragged, adjust the x position and width accordingly.
  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  // If the top corner is being dragged, adjust the y position and height accordingly.
  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  // If the bottom corner is being dragged, adjust the y position and height accordingly.
  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  // Return the updated bounds.
  return result;
};