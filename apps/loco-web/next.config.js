/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flivnewbucket.s3.ap-southeast-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.vietqr.io',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
