"use client"

// Import necessary components, hooks, and utility functions
import { useCallback, useMemo, useState } from 'react'
import { Info } from './info'
import { Participants } from './participants'
import { Toolbar } from './toolbar'
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from '@/types/canvas'
import { useHistory, useCanRedo, useCanUndo, useMutation, useStorage, useOthersMapped } from '@/liveblocks.config'
import { CursorsPresence } from './cursor-presence'
import { connectionIdToColor, pointerEventToCanvasPoint, resizeBounds } from '@/lib/utils'
import { nanoid } from "nanoid"
import { LiveObject } from '@liveblocks/client'
import { LayerPreview } from './layer-preview'
import { SelectionBox } from './selection-box'

const MAX_LAYERS = 100

// Define the props interface for the Canvas component
interface CanvasProps {
    boardId: string
}

// Canvas component for rendering the main board content
export const Canvas = ({ boardId }: CanvasProps) => {

    const layerIds = useStorage((root) => root.layerIds)

    // State to manage the camera position
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0
    })

    // State for managing the current mode of the canvas (e.g., drawing, selecting)
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })

    // Hooks for managing undo/redo history and canvas state
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    // Mutation for inserting a new layer onto the canvas
    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
        position: Point,
    ) => {
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LAYERS) {
            return;
        }

        const liveLayerIds = storage.get("layerIds");
        const layerId = nanoid();
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor,
        });

        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({ mode: CanvasMode.None });
    }, [lastUsedColor]);

    // Define a mutation for resizing the selected layer on the canvas
    const resizeSelectedLayer = useMutation((
        { storage, self }, // Destructure the storage and self objects from the context
        point: Point // The new point to resize the layer to
    ) => {
        // Check if the current mode is not resizing, if so, exit the function
        if (canvasState.mode !== CanvasMode.Resizing) {
            return;
        }

        // Calculate the new bounds for the layer based on the initial bounds, corner, and new point
        const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point)
        // Retrieve the live layers from the storage
        const liveLayers = storage.get("layers")
        // Get the selected layer from the live layers using the first element of the user's selection
        const layer = liveLayers.get(self.presence.selection[0])

        // If the layer exists, update its bounds
        if (layer) {
            layer.update(bounds)
        }

    }, [canvasState]) // Depend on the canvasState to re-run the mutation if it changes

    // Define a callback for handling pointer down events on the resize handle
    const onResizeHandlePointerDown = useCallback((corner: Side, initialBounds: XYWH) => {
        // Log the corner and initial bounds for debugging purposes

        // Pause the history to prevent undo/redo actions during the resize operation
        history.pause()
        // Update the canvas state to indicate that the user is resizing a layer
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner
        })
    }, [history]) // Depend on the history object to re-create the callback if it changes

    // Callback for handling mouse wheel events to zoom in/out
    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }))
    }, [])



    // Mutation for updating the user's cursor position on the canvas
    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault()
        const current = pointerEventToCanvasPoint(e, camera)

        if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current)
        }
        setMyPresence({ cursor: current })
    }, [canvasState, resizeSelectedLayer, camera])

    // Mutation for handling when the pointer leaves the canvas
    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null })
    }, [])


    const onPointerUp = useMutation(({ }, e) => {
        const pointer = pointerEventToCanvasPoint(e, camera)
        if (canvasState.mode === CanvasMode.Inserting) {
            insertLayer(canvasState.LayerType, pointer)
        } else {
            setCanvasState({
                mode: CanvasMode.None
            })
        }

        history.resume()

    }, [camera, canvasState, history, insertLayer])

    // Retrieve selections from other users' presences
    const selections = useOthersMapped((other) => other.presence.selection)

    // Handler for when a layer is clicked with the pointer
    const onLayerPointerDown = useMutation((
        { self, setMyPresence },
        e: React.PointerEvent,
        layerId: string
    ) => {
        // If the current mode is Pencil or Inserting, do nothing
        if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting) {
            return
        }

        // Pause the history to prevent undo/redo actions during this operation
        history.pause()
        // Stop the event from propagating further
        e.stopPropagation()

        // Convert the pointer event to a canvas point, taking into account the camera's position
        const point = pointerEventToCanvasPoint(e, camera)

        // If the current user's selection does not include the clicked layer, update the selection
        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection: [layerId] }, { addToHistory: true })
        }

        // Update the canvas state to indicate that the user is translating a layer
        setCanvasState({ mode: CanvasMode.Translating, current: point })

    }, [setCanvasState, camera, history, canvasState.mode])

    // Create a mapping of layer IDs to their corresponding selection colors
    const layerIdToColorSelection = useMemo(() => {
        const layerIdToColorSelection: Record<string, string> = {}

        // Iterate over each user's selections
        for (const user of selections) {
            const [connectionId, selection] = user

            // For each layer ID in the user's selection, map it to the user's color
            for (const layerId of selection) {
                layerIdToColorSelection[layerId] = connectionIdToColor(connectionId)
            }
        }
        return layerIdToColorSelection
    }, [selections])

    // Main container for the board, including components for info, participants, and toolbar
    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canRedo={canRedo}
                canUndo={canUndo}
                undo={history.undo}
                redo={history.redo}
            />
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
            >
                <g
                    style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}
                >
                    {layerIds.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={layerIdToColorSelection[layerId]}
                        />
                    ))}

                    <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    );
};