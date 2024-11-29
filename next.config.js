/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['sportzpoint.s3.ap-south-1.amazonaws.com'],
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
