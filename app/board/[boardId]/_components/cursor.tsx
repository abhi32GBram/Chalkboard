"use client"
// Importing necessary libraries and components
import { connectionIdToColor } from "@/lib/utils"
import { useOther } from "@/liveblocks.config"
import { MousePointer2 } from "lucide-react"
import { memo } from "react"

// Interface for the Cursor component props
interface CursorProps {
    connectionId: number
}

// Cursor component that displays a cursor for each user connected to the board
export const Cursor = memo(({ connectionId }: CursorProps) => {
    // Fetching user info and cursor position for the given connectionId
    const info = useOther(connectionId, (user) => user?.info)
    const cursor = useOther(connectionId, (user) => user.presence.cursor)
    // Default name if user info is not available
    const name = info?.name || "Teammate"

    // If cursor position is not available, do not render the component
    if (!cursor) {
        return null
    }

    // Extracting x and y coordinates from the cursor object
    const { x, y } = cursor

    // Rendering the cursor component with the user's name and position
    return (
        <foreignObject style={{ transform: `translateX(${x}px) translateY(${y}px)` }} height={50} width={name.length * 10 + 24} className=" relative drop-shadow-lg">
            {/* Displaying a mouse pointer icon with the user's color */}
            <MousePointer2 className="h-5 w-5"
                style={
                    {
                        fill: connectionIdToColor(connectionId),
                        color: connectionIdToColor(connectionId)
                    }
                }
            >
            </MousePointer2>
            {/* Displaying the user's name above the cursor */}
            <div className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold" style={{ backgroundColor: connectionIdToColor(connectionId) }}>
                {name}
            </div>
        </foreignObject>
    )
})

// Setting the display name for the Cursor component for debugging purposes
Cursor.displayName = "Cursor"