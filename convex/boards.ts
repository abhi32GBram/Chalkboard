import { v } from "convex/values"; // Importing validation utilities from Convex
import { query } from "./_generated/server";


export const get = query({
    args: {
        orgId: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unautharized Access")
        }

        const boards = await ctx.db
            .query("boards")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .collect()

        return boards
    }
})
