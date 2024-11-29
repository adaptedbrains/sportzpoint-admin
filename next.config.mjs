/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'img-cdn.thepublive.com',
      'picsum.photos',
      // 'sportzpoint.s3.ap-south-1.amazonaws.com', // Add the new hostname here
      "dmpsza32x691.cloudfront.net"
    ],
  },
};

export default nextConfig;
