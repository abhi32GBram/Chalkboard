// Importing necessary types and utilities
import { Camera, Color } from "@/types/canvas"
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