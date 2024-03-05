// Importing the Loader component from lucide-react for displaying a loading spinner
import { Loader } from "lucide-react";

// Importing React for creating the functional component
import React from 'react'

// Importing custom skeleton components for displaying placeholders while the actual content is loading
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

// The Loading component is a functional component that displays a loading spinner along with placeholders for the info, participants, and toolbar sections
export const Loading = () => {
    return (
        // The main container for the loading screen, styled to fill the entire viewport and center its children
        <main className='h-full w-full relative bg-neutral-200 touch-none flex items-center justify-center'>
            {/* // The Loader component is used to display a spinning loading spinner */}
            <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
            {/* // Placeholder for the info section, displayed while the actual info content is loading */}
            <InfoSkeleton />
            {/* // Placeholder for the participants section, displayed while the actual participants list is loading */}
            <ParticipantsSkeleton />
            {/* // Placeholder for the toolbar section, displayed while the actual toolbar is loading */}
            <ToolbarSkeleton />
        </main>
    )
}