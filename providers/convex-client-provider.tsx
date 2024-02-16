"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import { Loading } from "@/components/auth/loading";

// Define the props for the ConvexClientProvider component
interface ConvexClientProviderProps {
    children: React.ReactNode; // The children prop allows for nested components
}

// Retrieve the Convex URL from the environment variables
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

// Initialize the Convex client with the provided URL
const convex = new ConvexReactClient(convexUrl);

// Define the ConvexClientProvider component
export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
    // Wrap the children components with ClerkProvider for authentication
    return (
        // Wrap the children components with ConvexProviderWithClerk to provide Convex functionality
            // Render the children components only if the user is authenticated
                // Render a loading indicator while the authentication status is being determined
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <Authenticated>
                    {children}
                </Authenticated>
                <AuthLoading>
                    <Loading />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};