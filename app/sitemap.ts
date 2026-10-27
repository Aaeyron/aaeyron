import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

const pages = ["/", "/projects", "/experience", "/resources", "/stack", "/certificates", "/contact"];
const legalPages = ["/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({
      url: path === "/" ? siteUrl : `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...legalPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
