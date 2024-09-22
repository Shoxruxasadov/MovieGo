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
    ]
  },
  i18n: {
    locales: ['ru', 'en', 'uz'],
    localeDetection: false,
    defaultLocale: 'ru',
  },
};
export default nextConfig;
