"use client"

// Import necessary hooks and components
import { useSelectionBounds } from "@/hooks/use-selection-bounds"
import { useMutation, useSelf } from "@/liveblocks.config"
import { Camera, Color } from "@/types/canvas"
import { memo } from "react"
import { ColorPicker } from "./color-picker"
import { useDeleteLayer } from "@/hooks/use-delete-layer"

import { Button } from "@/components/ui/button"
import { Hint } from "@/components/hint"
import { Trash2 } from "lucide-react"

// Define the props for the SelectionTools component
interface SelectionToolsProps {
    camera: Camera // Camera object for positioning the selection tools
    setLastUsedColor: (color: Color) => void // Function to update the last used color
}

// SelectionTools component for handling selection-related actions
export const SelectionTools = memo(({ camera, setLastUsedColor }: SelectionToolsProps) => {

    // Use the useSelf hook to get the current user's selection
    const selection = useSelf((me) => me.presence.selection)

    // Define a mutation to set the fill color of selected layers
    const setFill = useMutation(({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers")
        setLastUsedColor(fill) // Update the last used color

        // Iterate over the selected layers and set their fill color
        selection.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill)
        })

    }, [selection, setLastUsedColor]) // Dependencies for the mutation

    // Hook to delete selected layers
    const deleteLayers = useDeleteLayer()

    // Hook to get the bounds of the current selection
    const selectionBounds = useSelectionBounds()

    // If there are no selection bounds, don't render the selection tools
    if (!selectionBounds) {
        return null
    }

    // Calculate the position for the selection tools based on the camera and selection bounds
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
    const y = selectionBounds.y + camera.y

    // Render the selection tools UI
    return (
        <div
            className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
            style={{
                transform: `translate(
                        calc(${x}px - 50%),
                        calc(${y - 16}px - 100%)
                )`
            }}
        >
            {/* ColorPicker component for selecting fill color */}
            <ColorPicker onChange={setFill} />

            {/* Button for deleting selected layers */}
            <div className="flex items-center pl-2 ml-2 border-l border-neutral-100">
                <Hint label="Delete">
                    <Button variant="board" size="icon" onClick={deleteLayers}>
                        <Trash2 />
                    </Button>
                </Hint>
            </div>
        </div>
    )
})

// Set the display name for the component for debugging purposes
SelectionTools.displayName = "SelectionTools"