import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "yglxvsygbxqnlqxhzdtt.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "moviego.uz",
      },
      {
        protocol: "https",
        hostname: "cloud.moviego.uz",
      },
      {
        protocol: "https",
        hostname: "moviego.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "server.moviego.uz",
      },
    ],
  },
  // i18n: {
  //   defaultLocale: "ru",
  //   localeDetection: false,
  //   locales: ["ru", "en", "uz"],
  // },
};

export default nextConfig;
