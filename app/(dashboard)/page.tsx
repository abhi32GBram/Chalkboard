"use client"
// Import necessary hooks and components
import { useOrganization } from '@clerk/nextjs';
import { EmptyOrg } from './_components/empty-org';
import { BoardList } from './_components/board-list';

// Define the props for the DashboardPage component
interface DashboardPageProps {
    // Search parameters that can be passed to filter boards
    searchParams: {
        search?: string;
        favourites?: string;
    };
}

// DashboardPage component that displays either an empty organization message or a list of boards
const DashboardPage = ({ searchParams }: DashboardPageProps) => {
    // Retrieve the current organization using the Clerk hook
    const { organization } = useOrganization();

    // Render the dashboard page content
    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {/* If there is no organization, display a placeholder */}
            {!organization ? (
                <EmptyOrg />
            ) : (
                // Otherwise, render the board list with the organization ID and search parameters
                <BoardList orgId={organization.id} query={searchParams} />
            )}
        </div>
    );
};

// Export the DashboardPage component as the default export
export default DashboardPage;