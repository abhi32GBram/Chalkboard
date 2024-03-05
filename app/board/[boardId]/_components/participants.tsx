"use client"

// Import necessary components and hooks
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from './user-avatar'
import { useOthers, useSelf } from '@/liveblocks.config'
import { connectionIdToColor } from '@/lib/utils'

// Define the maximum number of users to show in the participant list
const MAX_SHOWN_USERS = 2

// Component to display the list of participants in the board
export const Participants = () => {
    // Fetch the list of other users and the current user
    const users = useOthers()
    const currentUser = useSelf()

    // Determine if there are more users than the maximum shown
    const hasMoreUsers = users.length > MAX_SHOWN_USERS

    // Render the participant list
    return (
        <div className='absolute h-12 top-2 right-2 bg-white rounded-lg p-3 flex items-center shadow-md'>
            <div className='flex gap-x-2'>
                {/* Map over the users and render their avatars */}
                {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
                    return (
                        <UserAvatar key={connectionId} src={info?.picture} name={info?.name} fallback={info?.name?.[0] || "T"} borderColor={connectionIdToColor(connectionId)} />
                    )
                })}
                {/* Render the current user's avatar */}
                {currentUser && (
                    <UserAvatar src={currentUser.info?.picture} name={`${currentUser.info?.name} (You)`} fallback={currentUser.info?.name?.[0]} borderColor={connectionIdToColor(currentUser.connectionId)} />
                )}

                {/* If there are more users than the maximum shown, render a placeholder for the additional users */}
                {hasMoreUsers && (
                    <UserAvatar name={`${users.length - MAX_SHOWN_USERS} More`} fallback={`+ ${users.length - MAX_SHOWN_USERS}`} />
                )}
            </div>
        </div>
    )
}

// Component to display a skeleton loader for the participant list
export const ParticipantsSkeleton = () => {
    return (
        <div className='absolute h-12 top-2 right-2 bg-white rounded-lg p-3 flex items-center shadow-md w-[100px]'>
            <Skeleton className='h-full w-full text-muted-foreground ' />
        </div>
    )
}