"use client"

// Import necessary React hooks and components
import { useEffect, useState } from "react";
import { RenameModal } from "@/components/modals/rename-modal";

// Define the ModalProvider component
export const ModalProvider = () => {
    // State to track whether the component is mounted
    const [isMounted, setIsMounted] = useState(false);

    // useEffect hook to set isMounted to true after the component mounts
    useEffect(() => {
        setIsMounted(true); // Set isMounted to true after the component mounts
    }, []); // Empty dependency array ensures this effect runs only once after mount

    // If the component is not yet mounted, return null
    if (!isMounted) {
        return null;
    }

    // Render the RenameModal component once the component is mounted
    return (
        <>
            <RenameModal />
        </>
    );
};