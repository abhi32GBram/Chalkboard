// Define a type for representing a color with red, green, and blue components.
export type Color = {
    r: number; // Red component of the color.
    g: number; // Green component of the color.
    b: number; // Blue component of the color.
};

// Define a type for representing a camera's position with x and y coordinates.
export type Camera = {
    x: number; // X-coordinate of the camera's position.
    y: number; // Y-coordinate of the camera's position.
};

// Enum to represent different types of layers that can be drawn on the canvas.
export enum LayerType {
    Rectangle, // A rectangle layer.
    Ellipse,    // An ellipse layer.
    Path,       // A path layer, which can represent freehand drawings.
    Text,       // A text layer, for adding text annotations.
    Note,       // A note layer, for adding notes or comments.
};

// Define a type for a rectangle layer, including its position, size, fill color, and optional value.
export type RectangleLayer = {
    type: LayerType.Rectangle; // The type of the layer, which is Rectangle.
    x: number; // X-coordinate of the top-left corner of the rectangle.
    y: number; // Y-coordinate of the top-left corner of the rectangle.
    height: number; // Height of the rectangle.
    width: number; // Width of the rectangle.
    fill: Color; // Fill color of the rectangle.
    value?: string; // Optional value, which can be used for additional data or annotations.
};

// Define a type for an ellipse layer, similar to RectangleLayer but for ellipses.
export type EllipseLayer = {
    type: LayerType.Ellipse; // The type of the layer, which is Ellipse.
    x: number; // X-coordinate of the top-left corner of the ellipse's bounding box.
    y: number; // Y-coordinate of the top-left corner of the ellipse's bounding box.
    height: number; // Height of the ellipse's bounding box.
    width: number; // Width of the ellipse's bounding box.
    fill: Color; // Fill color of the ellipse.
    value?: string; // Optional value, which can be used for additional data or annotations.
};

// Define a type for a path layer, which can represent freehand drawings.
export type PathLayer = {
    type: LayerType.Path; // The type of the layer, which is Path.
    x: number; // X-coordinate of the top-left corner of the path's bounding box.
    y: number; // Y-coordinate of the top-left corner of the path's bounding box.
    height: number; // Height of the path's bounding box.
    width: number; // Width of the path's bounding box.
    fill: Color; // Fill color of the path.
    points: number[][]; // An array of points representing the path. Each point is an array of [x, y].
    value?: string; // Optional value, which can be used for additional data or annotations.
};

// Define a type for a text layer, for adding text annotations.
export type TextLayer = {
    type: LayerType.Text; // The type of the layer, which is Text.
    x: number; // X-coordinate of the top-left corner of the text bounding box.
    y: number; // Y-coordinate of the top-left corner of the text bounding box.
    height: number; // Height of the text bounding box.
    width: number; // Width of the text bounding box.
    fill: Color; // Fill color of the text.
    value?: string; // The text content.
};

// Define a type for a note layer, for adding notes or comments.
export type NoteLayer = {
    type: LayerType.Note; // The type of the layer, which is Note.
    x: number; // X-coordinate of the top-left corner of the note bounding box.
    y: number; // Y-coordinate of the top-left corner of the note bounding box.
    height: number; // Height of the note bounding box.
    width: number; // Width of the note bounding box.
    fill: Color; // Fill color of the note.
    value?: string; // The note content.
};

// Define a type for a point, which is used in various layers to represent positions.
export type Point = {
    x: number; // X-coordinate of the point.
    y: number; // Y-coordinate of the point.
};

// Define a type for representing a rectangle defined by its x, y, width, and height.
export type XYWH = {
    x: number; // X-coordinate of the top-left corner of the rectangle.
    y: number; // Y-coordinate of the top-left corner of the rectangle.
    width: number; // Width of the rectangle.
    height: number; // Height of the rectangle.
};

// Enum to represent different sides of a rectangle, used for resizing operations.
export enum Side {
    Top = 1,    // The top side of the rectangle.
    Bottom = 2, // The bottom side of the rectangle.
    Left = 4,   // The left side of the rectangle.
    Right = 8, // The right side of the rectangle.
};

// Define the state of the canvas, which can be in various modes depending on the current operation.
export type CanvasState =
    | {
        mode: CanvasMode.None; // No specific operation is being performed.
    }
    | {
        mode: CanvasMode.SelectionNet, // The canvas is in selection mode, allowing users to select layers.
        origin: Point; // The origin point of the selection.
        current?: Point; // The current point of the selection, if applicable.
    }
    | {
        mode: CanvasMode.Translating, // The canvas is in translation mode, allowing users to move layers.
        current: Point; // The current point of the translation.
    }
    | {
        mode: CanvasMode.Inserting, // The canvas is in insertion mode, allowing users to add new layers.
        LayerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note; // The type of the layer being inserted.
    }
    | {
        mode: CanvasMode.Pencil, // The canvas is in pencil mode, allowing users to draw freehand.
    }
    | {
        mode: CanvasMode.Pressing, // The canvas is in pressing mode, which can be used for various interactions.
        origin: Point; // The origin point of the pressing action.
    }
    | {
        mode: CanvasMode.Resizing, // The canvas is in resizing mode, allowing users to resize layers.
        initialBounds: XYWH; // The initial bounds of the layer being resized.
        corner: Side; // The corner of the layer being resized.
    };

// Enum to represent different modes of operation for the canvas.
export enum CanvasMode {
    None,       // No specific operation is being performed.
    Pressing,   // The canvas is in pressing mode, which can be used for various interactions.
    SelectionNet, // The canvas is in selection mode, allowing users to select layers.
    Translating, // The canvas is in translation mode, allowing users to move layers.
    Inserting,   // The canvas is in insertion mode, allowing users to add new layers.
    Resizing,    // The canvas is in resizing mode, allowing users to resize layers.
    Pencil,     // The canvas is in pencil mode, allowing users to draw freehand.
};