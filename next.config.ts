import type { NextConfig } from "next";

// Static export: the whole site is prebuilt HTML, so it deploys to Netlify or nginx with no Node server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
