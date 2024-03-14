"use client"
// Importing necessary hooks and components
import { useOthersConnectionIds } from "@/liveblocks.config"
import { memo } from "react"
import { Cursor } from "./cursor"

// Component to render cursors for other users
const Cursors = () => {
    // Fetching the connection IDs of other users
    const ids = useOthersConnectionIds()
    return (
        <>
            {/* Mapping over the connection IDs to render a Cursor component for each user */}
            {ids.map((connectionId) => (
                <Cursor key={connectionId} connectionId={connectionId} />
            ))}
        </>
    )
}

// Memoized component to optimize rendering
export const CursorsPresence = memo(() => {
    return (
        <>
            {/* TO DO : Placeholder for future implementation to show what other users are drawing */}
            <Cursors />
        </>
    )
})

// Setting a display name for the component for debugging purposes
CursorsPresence.displayName = "CursorPresence"