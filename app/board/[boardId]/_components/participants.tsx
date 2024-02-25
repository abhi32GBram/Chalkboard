import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const Participants = () => {
    return (
        <div className='  absolute h-12 top-2 right-2 bg-white rounded-lg p-3 flex items-center shadow-md'>
            List of Users
        </div>
    )
}

Participants.Skeleton= function ParticipantsSkeleton(){
    return (
        <div className='  absolute h-12 top-2 right-2 bg-white rounded-lg p-3 flex items-center shadow-md w-[100px]'>
            <Skeleton className='h-full w-full text-muted-foreground ' />
        </div>
    )
}
