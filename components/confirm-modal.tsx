"use client";

// Importing necessary components from the UI library
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Defining the props for the ConfirmModal component
interface ConfirmModalProps {
    children: React.ReactNode; // The content that triggers the modal
    onConfirm: () => void; // The function to call when the confirm action is clicked
    disabled?: boolean; // Optional prop to disable the confirm action
    header: string; // The title of the modal
    description?: string; // Optional description text for the modal
};

// The ConfirmModal component itself
export const ConfirmModal = ({
    children,
    onConfirm,
    disabled,
    header,
    description,
}: ConfirmModalProps) => {
    // Function to handle the confirm action
    const handleConfirm = () => {
        onConfirm();
    };

    // JSX for the ConfirmModal component
    return (
        <AlertDialog>
            {/* The trigger for the modal */}
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            {/* The content of the modal */}
            <AlertDialogContent>
                {/* The header of the modal */}
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {header}
                    </AlertDialogTitle>
                    {/* The description of the modal */}
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {/* The footer of the modal with cancel and confirm actions */}
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* The confirm action button */}
                    <AlertDialogAction disabled={disabled} onClick={handleConfirm}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};