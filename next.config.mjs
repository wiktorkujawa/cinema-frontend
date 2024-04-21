/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['m.media-amazon.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  env: {
    OMDB_API_KEY: process.env.OMDB_API_KEY,
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
