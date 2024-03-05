"use client"

// Importing necessary components
import { Info } from './info'
import { Participants } from './participants'
import { Toolbar } from './toolbar'

// Interface for Canvas component props
interface CanvasProps {
    boardId: string
}

// Canvas component that renders the main content of the board
export const Canvas = ({ boardId }: CanvasProps) => {
    // Main container for the board
    return (
        <main className='h-full w-full relative bg-neutral-200 touch-none'>
            {/* Info component displays board information */}
            <Info boardId={boardId} />
            {/* Participants component lists all participants on the board */}
            <Participants />
            {/* Toolbar component provides tools for interacting with the board */}
            <Toolbar />
        </main>
    )
}