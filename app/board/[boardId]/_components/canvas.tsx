"use client"

// Importing necessary components and hooks
import { useState } from 'react'
import { Info } from './info'
import { Participants } from './participants'
import { Toolbar } from './toolbar'
import { CanvasMode, CanvasState } from '@/types/canvas'
import { useHistory, useCanRedo, useCanUndo } from '@/liveblocks.config'

// Interface for Canvas component props
interface CanvasProps {
    boardId: string
}

// Canvas component that renders the main content of the board
export const Canvas = ({ boardId }: CanvasProps) => {
    // Hooks for managing undo/redo history and canvas state
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    // State for managing the canvas mode
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })

    // Main container for the board
    return (
        <main className='h-full w-full relative bg-neutral-200 touch-none'>
            {/* Info component displays board information */}
            <Info boardId={boardId} />
            {/* Participants component lists all participants on the board */}
            <Participants />
            {/* Toolbar component provides tools for interacting with the board */}
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canRedo={canRedo}
                canUndo={canUndo}
                undo={history.undo}
                redo={history.redo}
            />
        </main>
    )
}