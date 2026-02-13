/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.pollinations.ai', 'lh3.googleusercontent.com'],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_BRAND_COLOR: process.env.NEXT_PUBLIC_BRAND_COLOR,
  },
};

module.exports = nextConfig;
