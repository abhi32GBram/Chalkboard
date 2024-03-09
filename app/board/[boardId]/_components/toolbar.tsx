// Importing necessary components and icons
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { ToolButton } from './tool-button'
import { LucideCircle, MousePointer2, PencilIcon, RectangleHorizontal, Redo2, StickyNoteIcon, Type, Undo2 } from 'lucide-react'
import { CanvasMode, CanvasState, LayerType } from '@/types/canvas'

// Interface for the Toolbar component props
interface ToolbarProps {

    canvasState: CanvasState    // The current state of the canvas
    setCanvasState: (newState: CanvasState) => void // Function to update the canvas state
    undo: () => void // Function to undo the last action on the canvas
    redo: () => void // Function to redo the last undone action on the canvas
    canUndo: boolean // Boolean indicating whether an undo action can be performed
    canRedo: boolean // Boolean indicating whether a redo action can be performed
}
// Toolbar component for the canvas
export const Toolbar = ({ canvasState, setCanvasState, undo, redo, canRedo, canUndo }: ToolbarProps) => {
    return (
        <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
            <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
                {/* ToolButton for selecting elements */}
                <ToolButton label='Select' icon={MousePointer2} onClick={() => setCanvasState({ mode: CanvasMode.None })}
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Resizing
                    }
                />

                {/* ToolButton for inserting text */}
                <ToolButton label='Text' icon={Type} onClick={() => setCanvasState({
                    mode: CanvasMode.Inserting,
                    LayerType: LayerType.Text
                })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.LayerType === LayerType.Text
                    }
                />

                {/* ToolButton for inserting sticky notes */}
                <ToolButton label='Sticky Note' icon={StickyNoteIcon} onClick={() => setCanvasState({
                    mode: CanvasMode.Inserting,
                    LayerType: LayerType.Note
                })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.LayerType === LayerType.Note
                    }
                />

                {/* ToolButton for inserting rectangles */}
                <ToolButton label='Rectangle' icon={RectangleHorizontal} onClick={() => setCanvasState({
                    mode: CanvasMode.Inserting,
                    LayerType: LayerType.Rectangle
                })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.LayerType === LayerType.Rectangle
                    }
                />

                {/* ToolButton for inserting ellipses */}
                <ToolButton label='Ellipse' icon={LucideCircle} onClick={() => setCanvasState({
                    mode: CanvasMode.Inserting,
                    LayerType: LayerType.Ellipse
                })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.LayerType === LayerType.Ellipse
                    }
                />

                {/* ToolButton for pencil mode */}
                <ToolButton
                    label="Pen"
                    icon={PencilIcon}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Pencil,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Pencil
                    }
                />

            </div>
            {/* Undo and Redo buttons */}
            <div className='bg-white rounded-md flex flex-col p-1.5 items-center shadow-md'>
                <ToolButton label='Undo' icon={Undo2} onClick={undo} isDisabled={!canUndo} />
                <ToolButton label='Redo' icon={Redo2} onClick={redo} isDisabled={!canRedo} />
            </div>
        </div>
    )
}

// Skeleton component for the toolbar, used for loading state
export const ToolbarSkeleton = () => {
    return (
        <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] rounded-md shadow-md'>
            <Skeleton className='h-full w-full bg-muted-400' />
        </div>
    )
}