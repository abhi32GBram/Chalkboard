// Import necessary modules and types
import { shallow } from "@liveblocks/react";
import { Layer, XYWH } from "@/types/canvas";
import { useStorage, useSelf } from "@/liveblocks.config";

// Function to calculate the bounding box of a set of layers
const boundingBox = (layers: Layer[]): XYWH | null => {
    // Check if there are any layers to process
    const first = layers[0]
    if (!first) {
        return null
    }

    // Initialize the bounding box with the first layer's dimensions
    let left = first.x
    let right = first.x + first.width
    let top = first.y
    let bottom = first.y + first.height

    // Iterate over all layers to find the smallest and largest x, y, width, and height values
    for (let i = 0; i < layers.length; i++) {
        const { x, y, width, height } = layers[i]

        // Update left if the current layer's x is smaller
        if (left > x) {
            left = x
        }
        // Update right if the current layer's right edge is larger
        if (right < x + width) {
            right = x + width
        }

        // Update top if the current layer's y is smaller
        if (top > y) {
            top = y
        }
        // Update bottom if the current layer's bottom edge is larger
        if (bottom < y + height) {
            bottom = y + height
        }
    }

    // Return the bounding box dimensions
    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
    }
}

// Custom hook to get the selection bounds of the current user's selected layers
export const useSelectionBounds = () => {
    // Get the current user's selection
    const selection = useSelf((me) => me.presence.selection)

    // Use the boundingBox function to calculate the selection bounds
    return useStorage((root) => {
        // Map the selection to the actual layers and filter out any null values
        const selectedLayers = selection
            .map((layerId) => root.layers.get(layerId)!)
            .filter(Boolean)

        // Return the bounding box of the selected layers
        return boundingBox(selectedLayers)
    }, shallow)
}   