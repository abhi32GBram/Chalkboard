"use client";
// Import necessary hooks and components
import { useOrganizationList } from "@clerk/nextjs";
import { Item } from "./item";

// Define the List component that fetches and displays organization memberships
export const List = () => {
    // Use the useOrganizationList hook to fetch user's organization memberships
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true, // Set to true to enable infinite scrolling
        },
    });

    // If there are no memberships, render nothing
    if (!userMemberships.data?.length) return null;

    // Render a list of organization items
    return (
        <ul className="space-y-4">
            {/* Map over the user's organization memberships */}
            {userMemberships.data?.map((mem) => (
                // Render an Item component for each membership
                <Item key={mem.organization.id} id={mem.organization.id} name={mem.organization.name} imageUrl={mem.organization.imageUrl}
                />
            ))}
        </ul>
    );
};