// Importing the RectangleLayer type from the canvas types
import { colorToCSS } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

// Defining the props for the Rectangle component
interface RectangleProps {
    id: string; // Unique identifier for the rectangle
    layer: RectangleLayer; // Layer details including position, size, and fill color
    onPointerDown: (e: React.PointerEvent, id: string) => void; // Callback function for pointer down event
    selectionColor?: string; // Optional color for selection highlight
};

// Rectangle component that renders a rectangle on the canvas
export const Rectangle = ({ id, layer, onPointerDown, selectionColor }: RectangleProps) => {
    // Destructuring layer properties for easier access
    const { x, y, width, height, fill } = layer;

    // Returning the SVG rect element with the specified properties
    return (
        <rect
            className="drop-shadow-md" // Applying a drop shadow effect
            onPointerDown={(e) => onPointerDown(e, id)} // Handling pointer down event
            style={{ transform: `translate(${x}px, ${y}px)`, }} // Positioning the rectangle

            x={0} // Starting x-coordinate (relative to the transform)
            y={0} // Starting y-coordinate (relative to the transform)
            width={width} // Width of the rectangle
            height={height} // Height of the rectangle

            strokeWidth={1} // Width of the stroke (outline)
            fill={fill ? colorToCSS(fill) : "#a5b1c4"} // Sets the fill color of the rectangle to the specified color if available, otherwise defaults to a light gray color.
            stroke={selectionColor || "transparent"} // Sets the stroke color to the selection color if provided, otherwise defaults to transparent to hide the outline when not selected
        />
    );
};