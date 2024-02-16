// Importing the create function from the zustand library
import { create } from "zustand"

// Default values for the rename modal
const defaultValues = { id: "", title: "" }

// Interface defining the shape of the state for the rename modal
interface IRenameModel {
    // Indicates whether the rename modal is open
    isOpen: boolean
    // The initial values for the rename modal, including the id and title
    initialValues: typeof defaultValues
    // Function to open the rename modal with a specific id and title
    onOpen: (id: string, title: string) => void
    // Function to close the rename modal and reset its initial values
    onClose: () => void
}

// Creating a zustand store for the rename modal state
export const useRenameModal = create<IRenameModel>((set) => ({
    // Initial state: the rename modal is closed
    isOpen: false,
    // Function to open the rename modal with the given id and title
    onOpen: (id, title) => set({
        // Set the modal to open
        isOpen: true,
        // Set the initial values for the modal
        initialValues: { id, title },
    }),
    // Function to close the rename modal
    onClose: () => set({
        // Set the modal to close
        isOpen: false,
        // Reset the initial values to the default
        initialValues: defaultValues
    }),
    // The initial values for the rename modal
    initialValues: defaultValues
}))