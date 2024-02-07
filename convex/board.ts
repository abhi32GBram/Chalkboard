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