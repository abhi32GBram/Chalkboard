import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

// Define the props for the Footer component
interface FooterProps {
    isFavourite: boolean // Indicates whether the board is marked as favorite
    title: string // Title of the board
    authorLabel: string // Label for the author of the board
    createdAtLabel: string // Label for when the board was created
    onClick: () => void // Function to handle click events on the star icon
    disabled: boolean // Indicates whether the star button is disabled
}

// Footer component that displays information about a board
export const Footer = ({ isFavourite, title, authorLabel, createdAtLabel, onClick, disabled }: FooterProps) => {

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Stop the event from bubbling up to parent elements
        event.stopPropagation();
        // Prevent the default action of the event (e.g., form submission)
        event.preventDefault();

        // Call the onClick function passed as a prop to the Footer component
        onClick();
    }
    
    return (
        <div className="relative bg-white p-3">
            {/* Display the title of the board */}
            <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
                {title}
            </p>
            {/* Display the author and creation date, hidden until hover */}
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
                {authorLabel}, {createdAtLabel}
            </p>
            {/* Star button to toggle favoriting of the board */}
            <button disabled={disabled} onClick={handleClick} className={cn(
                "opacity-0 group-hover:opacity-100  transition absolute top-3 right-3 text-muted-foreground hover:text-purple-700",
                disabled && "curson-not-allowed opacity-75  "
            )}>
                {/* Star icon with conditional styling based on isFavourite prop */}
                <Star className={cn(
                    "h-4 w-4",
                    isFavourite && "fill-purple-700"
                )} />
            </button>
        </div>
    )
}