import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
// import { Expo } from "expo-server-sdk";

// let expo = new Expo();

export const sendMessage = mutation({
  args: {
    content: v.string(),
    group_id: v.id("groups"),
    user: v.string(),
    file: v.optional(v.string()),
    // pushToken: v.optional(v.string()), // Add pushToken to the mutation
  },
  handler: async (ctx, args) => {
    // Insert the message into the database
    await ctx.db.insert("messages", {
      content: args.content,
      group_id: args.group_id,
      user: args.user,
      file: args.file,
      // pushToken: args.pushToken, // Store the push token for later use
    });
  },
});

// export const sendMessage = mutation({
//   args: {
//     content: v.string(),
//     group_id: v.id("groups"),
//     user: v.string(),
//     file: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("messages", args);
//   },
// });

export const get = query({
  args: { chatid: v.id("groups") },
  handler: async ({ db }, { chatid }) => {
    return await db
      .query("messages")
      .filter((q) => q.eq(q.field("group_id"), chatid))
      .collect();
  },
});
