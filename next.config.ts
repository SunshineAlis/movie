// next.config.js
const nextConfig = {
  // Additional configuration options can be placed here
  env: {
    BASE_URL: process.env.BASE_URL || "", // Ensure that this can fallback if not set
    API_KEY: process.env.API_KEY || "",  // Same for API_KEY
  },
};

module.exports = nextConfig;
