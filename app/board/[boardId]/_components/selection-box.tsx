"use client"
// Import necessary hooks and types
import { useSelectionBounds } from "@/hooks/use-selection-bounds"
import { useSelf, useStorage } from "@/liveblocks.config"
import { LayerType, Side, XYWH } from "@/types/canvas"
import { memo } from "react"

// Define the props for the SelectionBox component
interface SelectionBoxProps {
    onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void
}

// Constant for the width of the resize handles
const HANDLE_WIDTH = 8

// The SelectionBox component is a memoized functional component
export const SelectionBox = memo(({ onResizeHandlePointerDown }: SelectionBoxProps) => {

    // Determine the sole layer ID if there's only one layer selected
    const soleLayerId = useSelf((me) => me.presence.selection.length === 1 ? me.presence.selection[0] : null);

    // Check if the resize handles should be shown based on the layer type
    const isShowingHandles = useStorage((root) => soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path);

    // Get the bounds of the selection
    const bounds = useSelectionBounds()

    // If there are no bounds, do not render the selection box
    if (!bounds) {
        return null
    }

    // Render the selection box and resize handles if applicable
    return (
        <>
            {/* Main selection box */}
            <rect
                className="fill-transparent stroke-purple-600 stroke-2 pointer-events-none"
                style={{
                    transform: `translate(${bounds.x}px, ${bounds.y}px)`,
                }}

                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
            />
            {/* Resize handles */}
            {isShowingHandles && (
                <>
                    {/* Top-left handle */}
                    <rect
                        className="fill-white stroke-2 stroke-purple-600"
                        x={0}
                        y={0}
                        style={{
                            cursor: "nwse-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: ` translate(
                                ${bounds.x - HANDLE_WIDTH / 2}px,
                                ${bounds.y - HANDLE_WIDTH / 2}px )`
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
                        }}
                    />
                    {/* Top handle */}
                    <rect
                        className="fill-white stroke-2 stroke-purple-600"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ns-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                translate(
                                        ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                                        ${bounds.y - HANDLE_WIDTH / 2}px)`
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Top, bounds);
                        }}
                    />
                    {/* Top-right handle */}
                    <rect
                        className="fill-white stroke-2 stroke-purple-600"
                        x={0}
                        y={0}
                        style={{
                            cursor: "nesw-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                            ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,
                                            ${bounds.y - HANDLE_WIDTH / 2}px)`
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
                        }}
                    />
                    {/* Right handle */}
                    <rect
                        className="fill-white stroke-2 stroke-purple-600"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ew-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                            ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                                            ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Right, bounds);
                        }}
                    />
                    {/* Bottom-right handle */}
                    <rect
                        className="fill-white stroke-2 stroke-purple-600"
                        x={0}
                        y={0}
                        style={{
                            cursor: "nwse-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                            ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                                            ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
                        }}
                    />
                    {/* Bottom handle */}
                    <rect
                        className="fill-white stroke-2 stroke-purple-600"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ns-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                            ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                                            ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Bottom, bounds);
                        }}
                    />
                    {/* Bottom-left handle */}
                    <rect
                        className="fill-white stroke-2 stroke-purple-600"
                        x={0}
                        y={0}
                        style={{
                            cursor: "nesw-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                            ${bounds.x - HANDLE_WIDTH / 2}px,
                                            ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
                        }}
                    />
                    {/* Left handle */}
                    <rect
                        className="fill-white stroke-2 stroke-purple-600"
                        x={0}
                        y={0}
                        style={{
                            cursor: "ew-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                            ${bounds.x - HANDLE_WIDTH / 2}px,
                                            ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px)`
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Left, bounds);
                        }}
                    />
                </>
            )}
        </>
    );
});

// Set the display name for the component for debugging purposes
SelectionBox.displayName = "SelectionBox"