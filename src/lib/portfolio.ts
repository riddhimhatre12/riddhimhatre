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

const SESSION_COOKIE_NAME = "portfolio_admin_session";
// In real apps, change this to a secure random string or use an environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SESSION_SECRET = "portfolio-secret-token-2026";

// Path to data file
const getFilePath = () => path.join(process.cwd(), "src", "data", "portfolio.json");

// Helper to check session
function isSessionValid(sessionToken: string | undefined): boolean {
  return sessionToken === SESSION_SECRET;
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
  .validator((data: PortfolioData) => data)
  .handler(async ({ data }) => {
    const { getCookie } = await import("@tanstack/react-start/server");
    // Verify session
    const sessionToken = getCookie(SESSION_COOKIE_NAME);
    if (!isSessionValid(sessionToken)) {
      throw new Error("Unauthorized: Invalid session or session expired.");
    }

    const filePath = getFilePath();
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
      return { success: true, message: "Portfolio updated successfully." };
    } catch (error) {
      console.error("Error writing portfolio data:", error);
      throw new Error("Failed to save portfolio data");
    }
  });

// 3. Login Admin
export const loginAdmin = createServerFn({ method: "POST" })
  .validator((password: string) => password)
  .handler(async ({ data: password }) => {
    if (password === ADMIN_PASSWORD) {
      const { setCookie } = await import("@tanstack/react-start/server");
      // Set the session cookie (expires in 7 days)
      setCookie(SESSION_COOKIE_NAME, SESSION_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return { success: true, message: "Logged in successfully." };
    }
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
