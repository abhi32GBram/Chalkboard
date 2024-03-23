"use client"

// Import necessary components, hooks, and utility functions
import { useCallback, useState } from 'react'
import { Info } from './info'
import { Participants } from './participants'
import { Toolbar } from './toolbar'
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from '@/types/canvas'
import { useHistory, useCanRedo, useCanUndo, useMutation, useStorage } from '@/liveblocks.config'
import { CursorsPresence } from './cursor-presence'
import { pointerEventToCanvasPoint } from '@/lib/utils'
import { nanoid } from "nanoid"
import { LiveObject } from '@liveblocks/client'
import { LayerPreview } from './layer-preview'

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
        setMyPresence({ cursor: current })
    }, [])

    // Mutation for handling when the pointer leaves the canvas
    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null })
    }, [])

    // State for managing the current mode of the canvas (e.g., drawing, selecting)
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })

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
                            onLayerPointerDown={() => { }}
                            selectionColor="#000"
                        />
                    ))}
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    );
};