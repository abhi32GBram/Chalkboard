"use client"
// Import necessary components and types
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

// Define the props for the ToolButton component
interface ToolButtonProps {

    label: string // The label to display for the tool button
    icon: LucideIcon // The icon to display for the tool button
    onClick: () => void // The function to execute when the tool button is clicked
    isActive?: boolean // Optional: Indicates if the tool button is currently active
    isDisabled?: boolean // Optional: Indicates if the tool button is disabled
}

// ToolButton component for rendering a tool button with an icon and label
export const ToolButton = ({ label, icon: Icon, onClick, isActive, isDisabled }: ToolButtonProps) => {
    // Render the ToolButton component
    return (
        // Wrap the button with a Hint component to display the label on hover
        <Hint label={label} side="right" sideOffset={14}>
            {/* // Render the Button component with the provided props */}
            <Button disabled={isDisabled} onClick={onClick} size="icon" variant={isActive ? "boardActive" : "board"}>
                {/* // Render the icon passed as a prop */}
                <Icon />
            </Button>
        </Hint>
    )
}