"use client"

// Import necessary dependencies
import { ClientSideSuspense } from "@liveblocks/react"
import { Layer } from '@/types/canvas'
import { ReactNode } from "react"

// Import RoomProvider from the liveblocks configuration
import { RoomProvider } from "@/liveblocks.config"
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client"

// Define the RoomProps interface for type checking the props of the Room component
interface RoomProps {
    children: ReactNode // The children components to be rendered within the RoomProvider
    roomId: string // The unique identifier for the room
    fallback: NonNullable<ReactNode> | null // The fallback component to display while loading
}

// Define the Room component that wraps its children with RoomProvider and ClientSideSuspense
export const Room = ({ children, roomId, fallback }: RoomProps) => {
    return (
        // RoomProvider is used to provide room-specific context to its children
        <RoomProvider
            id={roomId}
            initialPresence={{ cursor: null, selection: [] }}
            initialStorage={{ layers: new LiveMap<string, LiveObject<Layer>>, layerIds: new LiveList() }}
        >
            {/* // ClientSideSuspense is used to handle loading states while the room data is being fetched */}
            <ClientSideSuspense fallback={fallback}>
                {() => children}
                {/* // Render the children components */}
            </ClientSideSuspense>
        </RoomProvider>
    )
}