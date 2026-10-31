import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

const pages = ["/", "/experience", "/projects", "/stack", "/certificates", "/resources", "/contact"];
/** Detail pages linked from a section (not in the nav). */
const detailPages = ["/experience/ai-career-copilot"];
const legalPages = ["/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({
      url: path === "/" ? siteUrl : `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...detailPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...legalPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
