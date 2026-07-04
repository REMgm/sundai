import type { NextConfig } from "next";
import redirects from "./lib/redirects.json";

const nextConfig: NextConfig = {
  async redirects() {
    // Permanent redirects from every legacy .html path (link equity migration).
    return redirects;
  },
};

export default nextConfig;
