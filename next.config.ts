import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "/api/add-log-media": ["./public/logs/**/*"],
  },
};

export default nextConfig;
