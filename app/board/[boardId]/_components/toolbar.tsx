import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const Toolbar = () => {
    return (
        <div className=' absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
            <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
                <div>
                    Pencil
                </div>
                <div>
                    Square
                </div>
                <div>
                    circle
                </div>
                <div>
                    ellipse
                </div>

            </div>
            <div className='bg-white rounded-md flex flex-col  p-1.5 items-center shadow-md'>
                <div>
                    Undo
                </div>
                <div>
                    Redo
                </div>
            </div>
        </div>
    )
}

export const ToolbarSkeleton = () => {
    return (
        <div className=' absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] rounded-md shadow-md'>
            <Skeleton className='h-full w-full bg-muted-400' />
        </div>

    )
}