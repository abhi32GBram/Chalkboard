"use client"


import React from 'react'
import { Info } from './info'
import { Participants } from './participants'


export const Canvas = () => {
    return (
        <main className='h-full w-full relative bg-neutral-200 touch-none'>
            <Info />
            <Participants />
        </main>
    )
}
