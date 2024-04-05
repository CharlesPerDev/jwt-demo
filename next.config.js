/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

let public_origin = process.env.PUBLIC_ORIGIN ?? "";

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    serverActions: {
      allowedOrigins: [public_origin, "localhost:3000"],
    },
  },
};

export default config;
