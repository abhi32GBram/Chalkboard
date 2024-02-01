// Import necessary libraries and components
import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

// Define the properties for the Item component
interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

// Define the Item component
export const Item = ({ id, name, imageUrl }: ItemProps) => {
    // Get the current organization and the function to set the active organization
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    // Check if the current organization is the active one
    const isActive = organization?.id === id;

    // Define the click handler for the item
    const onClick = () => {
        // If there's no function to set the active organization, exit early
        if (!setActive) return;
        // Set the active organization
        setActive({ organization: id });
    };

    // Render the item
    return (
        <div className="aspect-square relative ">
            <Hint label={name} side="right" align="start" sideOffset={18}>
                <Image src={imageUrl} onClick={onClick} alt={name} fill className={cn(
                    "rounded-md cursor-pointer opacity-70 hover:opacity-100 transition",
                    isActive && " opacity-100"
                )} />
            </Hint>
        </div>
    );
};