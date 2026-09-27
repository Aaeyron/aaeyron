import type { NextConfig } from "next";

// The three early school projects no longer have case study pages.
const removedCaseStudies = ["library-management-system", "janas-boutique", "flashmind"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // About and Certificates were merged into /experience; keep old links working.
      { source: "/about", destination: "/experience", permanent: true },
      { source: "/certificates", destination: "/experience#certifications", permanent: true },
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
