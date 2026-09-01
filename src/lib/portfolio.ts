import { createServerFn } from "@tanstack/react-start";
import * as fs from "fs/promises";
import * as path from "path";

// Define TypeScript interfaces for our data structure
export interface HeroData {
  name: string;
  year: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  portraitCutout: string;
  portrait: string;
  bioParagraphs: string[];
  contact: {
    email: string;
    phone: string;
    github: string;
    instagram: string;
    linkedin: string;
    tiktok?: string;
  };
}

export interface SkillGroup {
  num: string;
  title: string;
  icon: string;
  skills: string[];
  span: string;
}

export interface ExperienceItem {
  type: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  title: string;
  school: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  key: string;
  name: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  platforms: string;
  goal: string;
  approach: string;
  stats: { n: string; l: string }[];
  color: string;
  image: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  skillsTitle: string;
  skillsSubtitle: string;
  skills: SkillGroup[];
  experienceTitle: string;
  experienceSub: string;
  educationSub: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projectsTitle: string;
  projects: ProjectItem[];
  caseStudies: CaseStudyItem[];
}

import * as crypto from "crypto";

const SESSION_COOKIE_NAME = "portfolio_admin_session";

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function getSessionSecret(): string {
  const secretBase = process.env.SESSION_SECRET || getAdminPassword();
  return crypto.createHash("sha256").update(`portfolio_sec_salt_2026_${secretBase}`).digest("hex");
}

function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "utf-8");
    const bufB = Buffer.from(b, "utf-8");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

// Path to data file
const getFilePath = () => path.join(process.cwd(), "src", "data", "portfolio.json");

// Helper to check session
function isSessionValid(sessionToken: string | undefined): boolean {
  if (!sessionToken || typeof sessionToken !== "string") return false;
  return safeCompare(sessionToken, getSessionSecret());
}

// 1. Get Portfolio Data
export const getPortfolioData = createServerFn({ method: "GET" })
  .handler(async () => {
    const filePath = getFilePath();
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      return JSON.parse(fileContent) as PortfolioData;
    } catch (error) {
      console.error("Error reading portfolio data:", error);
      throw new Error("Failed to load portfolio data");
    }
  });

// 2. Save Portfolio Data (requires auth verification)
export const savePortfolioData = createServerFn({ method: "POST" })
  .validator((data: PortfolioData) => {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid payload data");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const { getCookie } = await import("@tanstack/react-start/server");
    // Verify session
    const sessionToken = getCookie(SESSION_COOKIE_NAME);
    if (!isSessionValid(sessionToken)) {
      throw new Error("Unauthorized: Invalid session or session expired.");
    }

    const filePath = getFilePath();
    try {
      const jsonContent = JSON.stringify(data, null, 2);
      if (jsonContent.length > 5 * 1024 * 1024) {
        throw new Error("Payload size exceeds limit");
      }
      await fs.writeFile(filePath, jsonContent, "utf-8");
      return { success: true, message: "Portfolio updated successfully." };
    } catch (error) {
      console.error("Error writing portfolio data:", error);
      throw new Error("Failed to save portfolio data");
    }
  });

// 3. Login Admin
export const loginAdmin = createServerFn({ method: "POST" })
  .validator((password: string) => {
    if (typeof password !== "string" || password.length > 256) {
      throw new Error("Invalid password submission.");
    }
    return password;
  })
  .handler(async ({ data: password }) => {
    const targetPassword = getAdminPassword();
    if (safeCompare(password, targetPassword)) {
      const { setCookie } = await import("@tanstack/react-start/server");
      // Set the secure session cookie (expires in 7 days)
      setCookie(SESSION_COOKIE_NAME, getSessionSecret(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return { success: true, message: "Logged in successfully." };
    }
    // Prevent fast brute-force enumeration attacks
    await new Promise((resolve) => setTimeout(resolve, 350));
    throw new Error("Incorrect password. Please try again.");
  });

// 4. Logout Admin
export const logoutAdmin = createServerFn({ method: "POST" })
  .handler(async () => {
    const { deleteCookie } = await import("@tanstack/react-start/server");
    deleteCookie(SESSION_COOKIE_NAME, { path: "/" });
    return { success: true, message: "Logged out successfully." };
  });

// 5. Check Auth Status
export const checkAuthStatus = createServerFn({ method: "GET" })
  .handler(async () => {
    const { getCookie } = await import("@tanstack/react-start/server");
    const sessionToken = getCookie(SESSION_COOKIE_NAME);
    return { isAuthenticated: isSessionValid(sessionToken) };
  });
