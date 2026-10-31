import type { NextConfig } from "next";

// The three early school projects no longer have case study pages.
const removedCaseStudies = ["library-management-system", "janas-boutique", "flashmind"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // There's no About page; send old /about links to Experience. Temporary (307), so browsers
      // don't cache it in case an About page comes back.
      { source: "/about", destination: "/experience", permanent: false },
      // Old case study URLs go to the home page's "Where I started" section.
      ...removedCaseStudies.map((slug) => ({
        source: `/projects/${slug}`,
        destination: "/#school-projects",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
