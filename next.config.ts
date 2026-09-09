import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "/api/add-log-media": ["./public/logs/**/*"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-edd4c55b5661412ab9a93422d48dc4d6.r2.dev",
      },
    ],
  },
};

export default nextConfig;
