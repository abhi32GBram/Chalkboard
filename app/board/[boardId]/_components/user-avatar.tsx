// Import necessary components and interfaces
import { Hint } from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";

// Define the props for the UserAvatar component
interface UserAvatarProps {
    src?: string; // Source URL for the avatar image
    name?: string; // Name of the user, used as a fallback label
    fallback?: string; // Fallback text to display if the avatar image fails to load
    borderColor?: string; // Border color for the avatar
};

// UserAvatar component displays a user's avatar with a fallback text
export const UserAvatar = ({ src, name, fallback, borderColor }: UserAvatarProps) => {
    return (
        // Hint component wraps the avatar to provide a label when hovered
        <Hint label={name || "Teammate"} side="bottom" sideOffset={18}>
            <Avatar
                className="h-8 w-8 border-2" // Styling for the avatar
                style={{ borderColor }} // Dynamic border color
            >
                {/* // AvatarImage component displays the avatar image */}
                <AvatarImage src={src} />
                {/* // AvatarFallback component displays fallback text if the avatar image fails to load */}
                <AvatarFallback className="text-xs font-semibold">
                    {fallback}
                </AvatarFallback>
            </Avatar>
        </Hint>
    );
};