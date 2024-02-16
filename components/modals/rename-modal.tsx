"use client";

// Importing necessary hooks and components
import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

export const RenameModal = () => {
    // Hook to perform the API mutation for updating the board title
    const { mutate, pending } = useApiMutation(api.board.update);

    // Hook to manage the state of the rename modal
    const {isOpen, onClose, initialValues} = useRenameModal();

    // State to hold the current title input value
    const [title, setTitle] = useState(initialValues.title);

    // Effect to update the title state when the initialValues change
    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    // Function to handle the form submission
    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        // Perform the API mutation to update the board title
        mutate({
            id: initialValues.id,
            title,
        })
            .then(() => {
                // Show a success toast and close the modal
                toast.success("Board Title Updated");
                onClose();
            })
            .catch(() => {
                // Show an error toast if the mutation fails
                toast.error("Failed to Rename the Board Title ");
            });
    };

    // JSX for the RenameModal component
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Rename Board Title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Update the Board Title to something Special
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board title"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};