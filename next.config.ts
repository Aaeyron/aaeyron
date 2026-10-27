import type { NextConfig } from "next";

// The three early school projects no longer have case study pages.
const removedCaseStudies = ["library-management-system", "janas-boutique", "flashmind"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // About was merged into /experience; keep old links working.
      // (/certificates is a real page again, so its old redirect is gone.)
      { source: "/about", destination: "/experience", permanent: true },
      // Old case study URLs go to the "Early solo projects" section.
      ...removedCaseStudies.map((slug) => ({
        source: `/projects/${slug}`,
        destination: "/experience#early-projects",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
