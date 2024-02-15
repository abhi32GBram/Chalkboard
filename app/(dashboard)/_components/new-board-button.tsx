"use client"
// Import necessary libraries and components
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';


interface NewBoardButtonProps {
    orgId: string; // The ID of the organization for which the board is being created
    disabled?: boolean; // Optional prop to disable the button
}

// Export the NewBoardButton component
export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
    // Hook to handle API mutation for creating a new board
    const { mutate, pending } = useApiMutation(api.board.create);

    // Function to handle the click event of the button
    const onClick = () => {
        // Call the mutate function to create a new board with the given orgId and default title
        mutate({
            orgId,
            title: "Untitled"
        }).then((id) => {
            // Show success toast message upon successful creation of the board
            toast.success("Board Created");
            // TODO: Redirect to the newly created board's page (/boards/{id})
        }).catch(() => {
            // Show error toast message if the board creation fails
            toast.error("Failed to Create a Board");
        });
    };

    // Render the button with conditional styling based on whether the mutation is pending or the button is disabled
    return (
        <button
            disabled={pending || disabled} // Disable the button if the mutation is pending or if the button is explicitly disabled
            onClick={onClick} // Attach the onClick handler to the button
            className={cn(
                "col-span-1 aspect-[100/127] bg-purple-600 rounded-lg hover:bg-purple-800 flex flex-col items-center justify-center py-6", // Base styles for the button
                (pending || disabled) && "opacity-75 cursor-not-allowed  hover:bg-purple-600" // Conditional styles for when the button is disabled or the mutation is pending
            )}
        >
            <div /> {/* Placeholder div */}
            <Plus className='h-12 w-12 text-white stroke-1' />
            <p className='text-white text-light text-sm'>
                New Board
            </p>
        </button>
    );
};