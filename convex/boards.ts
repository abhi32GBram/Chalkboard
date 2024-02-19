import { v } from "convex/values";
import { query } from "./_generated/server";
import { favourite } from "./board";
import { getAllOrThrow } from "convex-helpers/server/relationships"

// Define the 'get' query for fetching boards
export const get = query({
    args: {
        // Define the expected argument for the query
        orgId: v.string(),
        search: v.optional(v.string()),
        favourites: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        // Get the user's identity from the context
        const identity = await ctx.auth.getUserIdentity()

        // Check if the user is authenticated
        if (!identity) {
            // Throw an error if the user is not authenticated
            throw new Error("Unautharized Access")
        }

        // Check if the user has requested to see their favourite boards
        if (args.favourites) {
            // Query the 'userFavourites' collection to get the boards the user has marked as favourites
            const favouritedBoards = await ctx.db
                .query("userFavourites")
                .withIndex("by_user_org", (q) => q
                    // Filter by the user's ID and the organization ID
                    .eq("userId", identity.subject)
                    .eq("orgId", args.orgId)
                )
                // Order the results in descending order
                .order("desc")
                // Collect the results into an array
                .collect()

            // Extract the IDs of the favourited boards
            const ids = favouritedBoards.map((b) => b.boardId)
            // Retrieve the full board details using the IDs
            const boards = await getAllOrThrow(ctx.db, ids)

            // Mark each board as a favourite and return the array of boards
            return boards.map((board) => ({
                ...board,
                isFavourite: true
            }))
        }

        // If the user has not requested favourites, check for a search term
        const title = args.search as string
        let boards = []

        if (title) {
            // If a search term is provided, search the 'boards' collection by title
            boards = await ctx.db.query("boards").withSearchIndex("search_title", (q) => q
                // Search for boards with a title matching the search term
                .search("title", title)
                // Filter by the organization ID
                .eq("orgId", args.orgId)
            ).collect() // Collect the results into an array
        } else {
            // If no search term is provided, query the 'boards' collection for all boards associated with the given organization ID
            boards = await ctx.db
                .query("boards")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId)) // Use the 'by_org' index to filter by organization ID
                .order("desc") // Order the results in descending order
                .collect() // Collect the results into an array
        }


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

