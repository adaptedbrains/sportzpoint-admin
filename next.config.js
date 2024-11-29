/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dmpsza32x691.cloudfront.net'],
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
