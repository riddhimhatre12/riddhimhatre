import { query, mutation, action } from "./_generated/server";
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

export const sendSmsNotification = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (_ctx, args) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER;
    const toPhone = process.env.NOTIFICATION_PHONE_NUMBER || "+919766379529";

    if (accountSid && authToken && fromPhone) {
      const bodyText = `New Portfolio Inquiry:\nName: ${args.name}\nEmail: ${args.email}\nPhone: ${args.phone || "N/A"}\nMessage: ${args.message}`;
      const authHeader = "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64");

      const params = new URLSearchParams();
      params.append("To", toPhone);
      params.append("From", fromPhone);
      params.append("Body", bodyText);

      try {
        const res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
          },
        );
        const responseData = await res.json();
        return { sent: res.ok, responseData };
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return { sent: false, error: errorMessage };
      }
    }
    return { sent: false, reason: "Twilio credentials not configured" };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").take(50);
  },
});
