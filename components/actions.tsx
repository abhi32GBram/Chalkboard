"use client"


import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

import { ConfirmModal } from "./confirm-modal";
import { toast } from "sonner";

import { Link2, Pencil, Trash2 } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useRenameModal } from "@/store/use-rename-modal";


interface ActionsProps {
    children: React.ReactNode; // The children to render within the dropdown menu trigger.
    side?: DropdownMenuContentProps["side"]; // Optional property to specify the side of the dropdown menu.
    sideOffset?: DropdownMenuContentProps["sideOffset"]; // Optional property to specify the offset from the side of the dropdown menu.
    id: string; // The ID of the board that the actions are associated with.
    title: string; // The title of the board that the actions are associated with.
};

// Define the Actions component
export const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
    // Hook to open the rename modal
    const { onOpen } = useRenameModal();
    // Hook to perform the board removal mutation
    const { mutate, pending } = useApiMutation(api.board.remove);

    // Function to copy the board link to the clipboard
    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            .then(() => toast.success("Board Link Copied"))
            .catch(() => toast.error("Failed to Copy Board Link"));
    }

    // Function to delete the board
    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success("Board Deleted"))
            .catch(() => toast.error("Error Deleting the Board"));
    }

    // Render the dropdown menu with actions
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()} side={side} sideOffset={sideOffset} className="w-60">
                {/* Menu item to copy the board link */}
                <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy Board Link
                </DropdownMenuItem>
                {/* Menu item to edit the board title */}
                <DropdownMenuItem onClick={() => onOpen(id, title)} className="p-3 cursor-pointer">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Board Title
                </DropdownMenuItem>
                {/* Confirm modal to delete the board */}
                <ConfirmModal
                    header="Delete Board ?"
                    description="This will Permanently Delete the Board and all of its Contents"
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button variant="ghost" className="p-3 cursor-pointer text-sm  justify-start font-normal" >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Board
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}