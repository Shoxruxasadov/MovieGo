import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "yglxvsygbxqnlqxhzdtt.supabase.co",
      },
    ],
  },
  i18n: {
    defaultLocale: "ru",
    localeDetection: false,
    locales: ["ru", "en", "uz"],
  },
};

export default nextConfig;
