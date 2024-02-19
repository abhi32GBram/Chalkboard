import { v } from "convex/values";
import { query } from "./_generated/server";
import { favourite } from "./board";

// Define the 'get' query for fetching boards
export const get = query({
    args: {
        // Define the expected argument for the query
        orgId: v.string()
    },
    handler: async (ctx, args) => {
        // Get the user's identity from the context
        const identity = await ctx.auth.getUserIdentity()

        // Check if the user is authenticated
        if (!identity) {
            // Throw an error if the user is not authenticated
            throw new Error("Unautharized Access")
        }

        // Query the database for boards associated with the given organization ID
        const boards = await ctx.db
            .query("boards")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId)) // Use the 'by_org' index to filter by organization ID
            .order("desc") // Order the results in descending order
            .collect() // Collect the results into an array

        // Map over the boards to check if each board is a favourite for the user
        const boardsWithFavouriteRelation = boards.map((board) => {
            // Query the 'userFavourites' collection to check if the user has marked the board as a favourite
            return ctx.db
                .query("userFavourites")
                .withIndex("by_user_board", (q) => q // Use the 'by_user_board' index to filter by user ID and board ID
                    .eq("userId", identity.subject) // Filter by the user's ID
                    .eq("boardId", board._id) // Filter by the board's ID
                )
                .unique().then((favourite) => { // Ensure only one result is returned
                    // Return the board with an additional 'isFavourite' property indicating if it's a favourite
                    return {
                        ...board,
                        isFavourite: !!favourite
                    }
                })
        })

        // Wait for all promises to resolve and return the array of boards with the 'isFavourite' property
        const boardsWithFavouriteBoolean = Promise.all(boardsWithFavouriteRelation)

        // Return the array of boards with the 'isFavourite' property
        return boardsWithFavouriteBoolean
    }
})