/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'yglxvsygbxqnlqxhzdtt.supabase.co',
      },
    ]
  },
  i18n: {
    defaultLocale: 'uz',
    localeDetection: false,
    locales: ['ru', 'en', 'uz'],
  },
};
export default nextConfig;
