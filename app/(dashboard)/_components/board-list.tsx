"use client"
// Import necessary components
import { EmptyBoard } from "./empty-board";
import { EmptyFavourites } from "./empty-favourites";
import { EmptySearch } from "./empty-search";

// Define the props for the BoardList component
interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favourites?: string;
    };
}

// Define the BoardList functional component
export const BoardList = ({ orgId, query }: BoardListProps) => {
    // Placeholder array for data, to be replaced with actual API calls
    const data = [];

    // Check if there is no data and a search query is present
    if (!data?.length && query.search) {
        // Return the EmptySearch component if no data is found for the search query
        return <EmptySearch />;
    }

    // Check if there is no data and the favourites flag is true
    if (!data?.length && query.favourites) {
        // Return the EmptyFavourites component if no data is found for favourited boards
        return <EmptyFavourites />;
    }

    // Check if there is no data at all
    if (!data?.length) {
        // Return the EmptyBoard component if no data is available
        return <EmptyBoard />;
    }

    // Render the board list with the query object for debugging purposes
    return (
        <div>
            {/* Display the query object as a JSON string */}
            {JSON.stringify(query)}
        </div>
    );
};