"use client"

// Importing necessary utilities and types
import { colorToCSS } from "@/lib/utils"
import { Color } from "@/types/canvas"

// Defining the props for the ColorPicker component
interface ColorPickerProps {
    onChange: (color: Color) => void // Function to handle color change
}

// ColorPicker component that renders a set of predefined color buttons
export const ColorPicker = ({ onChange }: ColorPickerProps) => {
    return (
        // Container div for the color buttons
        <div className="flex flex-wrap gap-2 items-center max-w-[165px] pr-2 mr-2 border-r border-neutral-300" >
            {/* ColorButton components for each predefined color */}
            <ColorButton color={{ r: 83, g: 31, b: 125 }} onClick={onChange} />
            <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 249, b: 177 }} onClick={onChange} />
            <ColorButton color={{ r: 131, g: 20, b: 20 }} onClick={onChange} />
            <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
            <ColorButton color={{ r: 215, g: 210, b: 32 }} onClick={onChange} />
            <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
            <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
        </div>
    )
}

// Defining the props for the ColorButton component
interface ColorButtonProps {
    onClick: (color: Color) => void // Function to handle click event
    color: Color // Color object for the button
}

// ColorButton component that renders a single color button
export const ColorButton = ({ color, onClick }: ColorButtonProps) => {
    return (
        // Button element styled to display the color
        <button className=" w-8 h-8 items-center justify-center hover:opacity-75 transition" onClick={() => onClick(color)}>
            <div className="h-8 w-8 rounded-md border border-neutral-100" style={{ background: colorToCSS(color) }} />
        </button >
    )
}