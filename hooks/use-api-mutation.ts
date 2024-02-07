import { useMutation } from "convex/react";
import { useState } from "react";

/**
 * Custom hook for performing API mutations with Convex.
 * This hook wraps around the useMutation hook from Convex and provides additional
 * state management for pending requests.
 *
 * @param mutationFunction - The mutation function provided by Convex.
 * @returns An object containing the mutate function and the pending state.
 */
export const useApiMutation = (mutationFunction: any) => {
    // State to track whether a mutation request is pending
    const [pending, setPending] = useState(false);

    // Initialize the Convex mutation hook with the provided mutation function
    const apiMutation = useMutation(mutationFunction);

    /**
     * Function to execute the mutation with the given payload.
     * Sets the pending state to true before executing the mutation and
     * resets it to false once the mutation is complete.
     *
     * @param payload - The data to be sent with the mutation request.
     * @returns A promise that resolves with the result of the mutation or rejects with an error.
     */
    const mutate = (payload: any) => {
        // Set the pending state to true to indicate a mutation is in progress
        setPending(true);
        // Execute the mutation and handle the promise
        return apiMutation(payload)
            .finally(() => {
                // Reset the pending state to false once the mutation is complete
                setPending(false);
            })
            .then((result) => {
                // Resolve the promise with the result of the mutation
                return result;
            })
            .catch((error) => {
                // Reject the promise with the error from the mutation
                throw error;
            });
    };

    // Return the mutate function and the pending state
    return { mutate, pending };
};