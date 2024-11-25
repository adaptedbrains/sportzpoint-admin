/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure modules are resolved correctly
  webpack: (config, { isServer }) => {
    // Add TailwindCSS and PostCSS loaders
    config.module.rules.push({
      test: /\.css$/,
      use: ['postcss-loader'],
    });
    return config;
  },
}

module.exports = nextConfig 