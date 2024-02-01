"use client"

import { Hint } from "@/components/hint"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"

import { Plus } from "lucide-react"

import React from 'react'

const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint label="Create Organization" side="right" align="start" sideOffset={18}>
                        <button className="h-full w-full  bg-slate-600 rounded-md flex items-center justify-center opacity-70 hover:opacity-100 transition">
                            <Plus className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 border-none bg-transparent max-w-[480px]">
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    )
}

export default NewButton


