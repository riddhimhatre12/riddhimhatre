import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const send = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.name.trim() || !args.email.trim() || !args.message.trim()) {
      throw new Error("Name, email, and message are required fields.");
    }
    const messageId = await ctx.db.insert("messages", {
      name: args.name.trim(),
      email: args.email.trim(),
      phone: args.phone ? args.phone.trim() : undefined,
      message: args.message.trim(),
      createdAt: Date.now(),
      status: "unread",
    });
    return { success: true, messageId };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").take(50);
  },
});
