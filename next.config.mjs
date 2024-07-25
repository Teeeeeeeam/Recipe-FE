/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'recipe1.ezmember.co.kr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'recipe-reader-kr.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.recipe.n-e.kr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.recipe.o-r.kr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd2d8tf2n841pdt.cloudfront.net',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
