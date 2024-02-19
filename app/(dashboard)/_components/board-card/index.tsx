"use client"
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { Overlay } from "./overlay";

import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";


import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

// Define the properties expected by the BoardCard component
interface BoardCardProps {
    id: string; // Unique identifier for the board card
    title: string; // Title of the board card
    imageUrl: string; // URL for the image displayed on the board card
    authorId: string; // Identifier for the author of the board card
    authorName: string; // Name of the author of the board card
    createdAt: number; // Timestamp when the board card was created
    orgId: string; // Identifier for the organization associated with the board card
    isFavourite: boolean; // Flag indicating whether the board card is marked as favourite
}


export const BoardCard = ({ id, title, imageUrl, authorId, authorName, createdAt, orgId, isFavourite }: BoardCardProps) => {
    // Get the current user's ID from the authentication context
    const { userId } = useAuth();
    // Determine the label for the author based on whether the current user is the author
    const authorLabel = userId === authorId ? "You" : authorName;
    // Format the creation timestamp to a relative time string
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true
    });

    // Using the useApiMutation hook to get the mutation function and pending state for favouriting a board
    const { mutate: onFavourite, pending: pendingFavourite, } = useApiMutation(api.board.favourite);
    // Using the useApiMutation hook to get the mutation function and pending state for unfavouriting a board
    const { mutate: onUnFavourite, pending: pendingUnFavourite } = useApiMutation(api.board.unFavourite);

    // Function to toggle the favourite status of a board
    const toggleFavourite = () => {
        // If the board is currently marked as favourite, unfavourite it
        if (isFavourite) {
            // Call the onUnFavourite mutation with the board's ID
            onUnFavourite({ id }).catch(() => {
                // If the mutation fails, display an error toast message
                toast.error("failed to UN favourite");
            });
        } else {
            // If the board is not marked as favourite, favourite it
            // Call the onFavourite mutation with the board's ID and the organization ID
            onFavourite({ id, orgId }).catch(() => {
                // If the mutation fails, display an error toast message
                toast.error("failed to  favourite");
            });
        }
    };
    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-purple-50">
                    <Image src={imageUrl} alt={title} fill className="object-fit" />
                    <Overlay />
                    <Actions id={id} title={title} side="right">
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavourite={isFavourite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFavourite}
                    disabled={pendingFavourite || pendingUnFavourite}
                />
            </div>
        </Link>
    );
};

// Define a skeleton component for the BoardCard to display while content is loading
BoardCard.Skeleton = function BoardCardSkeleton() {
    // Create a container div with specific aspect ratio and overflow hidden
    return (
        <div className="aspect-[100/127] overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    );
};