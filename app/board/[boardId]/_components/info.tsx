"use client"

import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { Actions } from '@/components/actions'

// Importing API and utilities for fetching board data
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Id } from '@/convex/_generated/dataModel'

import Link from 'next/link'

// Importing custom hook for managing rename modal state
import { useRenameModal } from '@/store/use-rename-modal'
import { Menu, MenuIcon } from 'lucide-react'



interface InfoProps {
    boardId: string
}

const font = Poppins({ subsets: ["latin"], weight: ["600"] })

// Function component for rendering a separator between tabs
const TabSeparator = () => {
    return (
        <div className=' text-neutral-400  px-1.5'>
            |
        </div>
    )
}

export const Info = ({ boardId }: InfoProps) => {

    // Hook for opening the rename modal
    const { onOpen } = useRenameModal()

    // Fetching board data using the boardId
    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">
    })

    if (!data) return <InfoSkeleton />
    return (
        <div className='absolute top-2 left-2 bg-white rounded-lg px-1.5 h-12 flex items-center shadow-md'>
            <Hint label='Go to Boards' side="bottom" sideOffset={10}>
                {/* Link to the main boards page */}
                <Button asChild className='p-2' variant="board" >
                    <Link href="/">
                        <Image src="/logo.svg" alt='logo' width={40} height={40} />
                        <span className={cn(
                            "font-semibold text-xl ml-2 text-black",
                            font.className
                        )}>
                            Chalkboard
                        </span>
                    </Link>
                </Button>
            </Hint>
            <TabSeparator />
            <Hint label='Edit Board Title' side="bottom" sideOffset={10}>
                <Button variant="board" className=' text-base font-normal px-2' onClick={() => onOpen(data._id, data.title)}>
                    {data.title}
                </Button>
            </Hint>
            <TabSeparator />
            
            {/* Actions menu for the board */}
            <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
                <div>
                    <Hint label='Main Menu' side="bottom" sideOffset={10}>
                        <Button size="icon" variant="board" >
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div >
    )
}

export const InfoSkeleton = () => {

    return (
        <div className='absolute top-2 left-2 bg-white rounded-lg px-1.5 h-12 flex items-center shadow-md w-[300px]' >
            <Skeleton className='h-full w-full  bg-muted-400' />
        </div>
    )
}