/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'firebasestorage.googleapis.com', 'lh3.googleusercontent.com', 'moviego.uz', 'www.moviego.uz', 'server.moviego.uz'],
  },
  i18n: {
    locales: ['uz', 'ru', 'en'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
