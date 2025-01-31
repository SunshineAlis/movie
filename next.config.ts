import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BASE_URL: process.env.BASE_URL || "",
    API_KEY: process.env.API_KEY || "",
  },
};

export default nextConfig;
