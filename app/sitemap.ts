import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

const pages = ["/", "/projects", "/experience", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
