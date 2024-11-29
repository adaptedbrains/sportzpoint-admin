/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['sportzpoint.s3.ap-south-1.amazonaws.com'],
  },
  transpilePackages: [
    '@wordpress/block-editor',
    '@wordpress/blocks',
    '@wordpress/components',
    '@wordpress/element',
    '@wordpress/primitives',
    '@wordpress/block-library'
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
  // Enable if you need to allow specific headers or methods
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
