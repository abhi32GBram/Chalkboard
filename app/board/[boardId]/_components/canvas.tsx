"use client"

"use client"

// Import necessary components, hooks, and utility functions
import { useCallback, useState } from 'react'
import { Info } from './info'
import { Participants } from './participants'
import { Toolbar } from './toolbar'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import { useHistory, useCanRedo, useCanUndo, useMutation } from '@/liveblocks.config'
import { CursorsPresence } from './cursor-presence'
import { pointerEventToCanvasPoint } from '@/lib/utils'

// Define the props interface for the Canvas component
interface CanvasProps {
    boardId: string
}

// Canvas component for rendering the main board content
export const Canvas = ({ boardId }: CanvasProps) => {

    // State to manage the camera position
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

    // Hooks for managing undo/redo history and canvas state
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

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

    // Main container for the board, including components for info, participants, and toolbar
    return (
        <main className='h-full w-full relative bg-neutral-200 touch-none'>
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
            <svg className='h-[100vh] w-[100vw]' onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
                <g>
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}