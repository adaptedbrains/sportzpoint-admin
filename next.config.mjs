/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'img-cdn.thepublive.com',
      'picsum.photos',
      'sportzpoint-media.s3.ap-south-1.amazonaws.com', // Add the new hostname here
    ],
  },
};

export default nextConfig;
