import { v } from "convex/values"; // Importing validation utilities from Convex
import { mutation } from "./_generated/server"; // Importing mutation function from the generated server code

const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
]; // Array of placeholder image paths

export const create = mutation({
    args: {
        orgId: v.string(), // Validating that orgId is a string
        title: v.string(), // Validating that title is a string
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity(); // Getting the authenticated user's identity

        if (!identity) {
            throw new Error("Unauthorized Access"); // Throwing an error if the user is not authenticated
        }

        const randomImage = images[Math.floor(Math.random() * images.length)]; // Selecting a random image from the array
        const board = await ctx.db.insert("boards", { // Inserting a new board record into the database
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage
        });
        return board; // Returning the newly created board object
    }
});


export const remove = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized Access !!")
        }

        // ADD THE ABILITY TO CASCADELY DELETE THE FAVOURITED RELAITIONS ASWELL

        await ctx.db.delete(args.id)
    }

})



// The 'update' mutation is used to update the title of a board
export const update = mutation({
    // Define the arguments that the mutation expects
    args: {
        id: v.id("boards"), // The ID of the board to update
        title: v.string(), // The new title for the board
    },
    // Define the function that will be called when the mutation is executed
    handler: async (ctx, args) => {
        // Get the identity of the user who is trying to update the board
        const identity = await ctx.auth.getUserIdentity();

        // If the user is not authenticated, throw an error
        if (!identity) {
            throw new Error("Unauthorized Access");
        }

        // Trim any leading or trailing whitespace from the title
        const title = args.title.trim();

        // If the title is empty after trimming, throw an error
        if (!title) {
            throw new Error("Title is Required");
        }

        // If the title is too long, throw an error
        if (title.length >  60) {
            throw new Error("Title cannot be Longer than  60 Characters");
        }

        // Update the board's title in the database
        const board = await ctx.db.patch(args.id, {
            title: args.title, // Set the new title
        });

        // Return the updated board object
        return board;
    },
});