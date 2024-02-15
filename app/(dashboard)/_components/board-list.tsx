"use client"
// Import necessary components


import { useQuery } from "convex/react";
import { EmptyBoard } from "./empty-board";
import { EmptyFavourites } from "./empty-favourites";
import { EmptySearch } from "./empty-search";
import { api } from "@/convex/_generated/api";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";

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

    const data = useQuery(api.boards.get, { orgId })
    //
    if (data === undefined) {
        return (
            <div>
                <h2 className="text-4xl font-semibold">
                    {query.favourites ? "Favourite Boards" : "Team Boards"}
                </h2>
                <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <NewBoardButton orgId={orgId} disabled />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                </div>
            </div>

        )
    }

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
            <h2 className="text-4xl font-semibold">
                {query.favourites ? "Favourite Boards" : "Team Boards"}
            </h2>
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <NewBoardButton orgId={orgId} />
                {data?.map((board) => (
                    <BoardCard
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageUrl={board.imageUrl}
                        authorId={board.authorId}
                        authorName={board.authorName}
                        createdAt={board._creationTime}
                        orgId={board.orgId}
                        isFavourite={true}
                    />
                ))}
            </div>
        </div>
    );
};