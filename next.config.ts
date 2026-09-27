import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // About and Certificates were merged into /experience; keep old links working.
  async redirects() {
    return [
      { source: "/about", destination: "/experience", permanent: true },
      { source: "/certificates", destination: "/experience#certifications", permanent: true },
    ];
  },
};

export default nextConfig;
