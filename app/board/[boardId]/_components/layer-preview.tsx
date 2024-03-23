
"use client";

// Import necessary React and project-specific modules
import { memo } from "react";
import { LayerType } from "@/types/canvas";
import { useStorage } from "@/liveblocks.config";
import { Rectangle } from "./rectangle";

// Define the props for the LayerPreview component
interface LayerPreviewProps {
    id: string; // Unique identifier for the layer
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void; // Callback for pointer down event on the layer
    selectionColor?: string; // Optional color for selection highlight
};

// LayerPreview component is a memoized functional component
export const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    selectionColor,
}: LayerPreviewProps) => {
    // Retrieve the layer data from storage using its unique id
    const layer = useStorage((root) => root.layers.get(id));

    // If the layer does not exist, return null to avoid rendering
    if (!layer) {
        return null;
    }

    // Switch statement to render different components based on the layer type
    switch (layer.type) {
        case LayerType.Rectangle:
            // Render a Rectangle component if the layer type is Rectangle
            return (
                <Rectangle
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        default:
            // Log a warning and return null if the layer type is unknown
            
            // console.warn("Unknown layer type");
            return null;
    }
});

// Set the display name for the LayerPreview component for debugging purposes
LayerPreview.displayName = "LayerPreview";