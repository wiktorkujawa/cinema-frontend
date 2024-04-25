/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['m.media-amazon.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/searchMovie/:title',
        destination: `https://www.omdbapi.com/?s=:title&apikey=${process.env.OMDB_API_KEY}`,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  }
};

export default nextConfig;
