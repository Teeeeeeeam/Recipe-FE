/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'recipe1.ezmember.co.kr',
        pathname: '/cache/**'
      }
    ]
  }
};

export default nextConfig;
