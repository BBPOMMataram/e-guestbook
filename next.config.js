/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: { domains: ['localhost'] },
  // trailingSlash: true,
}

module.exports = nextConfig
