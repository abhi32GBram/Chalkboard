// Import necessary hooks from Liveblocks configuration
import { useMutation, useSelf } from "@/liveblocks.config";

// Custom hook to delete selected layers from the canvas
export const useDeleteLayer = () => {
    // Get the current user's selection of layers
    const selection = useSelf((me) => me.presence.selection)

    // Define a mutation to delete selected layers
    return useMutation(({ storage, setMyPresence }) => {
        // Retrieve the current layers and their IDs from storage
        const liveLayers = storage.get("layers")
        const liveLayerIds = storage.get("layerIds")

        // Iterate over each selected layer ID
        for (const id of selection) {
            // Delete the layer from the liveLayers object
            liveLayers.delete(id)

            // Find the index of the layer ID in the liveLayerIds array
            const index = liveLayerIds.indexOf(id)

            // If the layer ID is found in the liveLayerIds array, remove it
            if (index !== -1) {
                liveLayerIds.delete(index)
            }
        }
        // Clear the current user's selection and update their presence
        setMyPresence({ selection: [] }, { addToHistory: true })
    }, [selection]) // Depend on the selection to re-run the mutation if it changes
}