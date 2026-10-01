import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const portfolioDoc = await ctx.db.query("portfolio").order("desc").first();
    return portfolioDoc;
  },
});

export const save = mutation({
  args: {
    hero: v.object({
      name: v.string(),
      year: v.string(),
    }),
    about: v.object({
      title: v.string(),
      subtitle: v.string(),
      portraitCutout: v.string(),
      portrait: v.string(),
      bioParagraphs: v.array(v.string()),
      contact: v.object({
        email: v.string(),
        phone: v.string(),
        github: v.string(),
        instagram: v.string(),
        linkedin: v.string(),
        tiktok: v.optional(v.string()),
      }),
    }),
    skillsTitle: v.string(),
    skillsSubtitle: v.string(),
    skills: v.array(
      v.object({
        num: v.string(),
        title: v.string(),
        icon: v.string(),
        skills: v.array(v.string()),
        span: v.string(),
      }),
    ),
    experienceTitle: v.string(),
    experienceSub: v.string(),
    educationSub: v.string(),
    experience: v.array(
      v.object({
        type: v.string(),
        title: v.string(),
        company: v.string(),
        period: v.string(),
        certificateId: v.optional(v.string()),
        description: v.string(),
      }),
    ),
    education: v.array(
      v.object({
        title: v.string(),
        school: v.string(),
        period: v.string(),
        description: v.string(),
        highlights: v.optional(v.array(v.string())),
      }),
    ),
    projectsTitle: v.string(),
    projects: v.array(
      v.object({
        key: v.string(),
        name: v.string(),
      }),
    ),
    caseStudies: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        client: v.string(),
        industry: v.string(),
        location: v.string(),
        platforms: v.string(),
        goal: v.string(),
        approach: v.string(),
        stats: v.array(v.object({ n: v.string(), l: v.string() })),
        color: v.string(),
        image: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("portfolio").order("desc").first();
    const dataWithTimestamp = {
      ...args,
      updatedAt: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, dataWithTimestamp);
      return existing._id;
    } else {
      return await ctx.db.insert("portfolio", dataWithTimestamp);
    }
  },
});
