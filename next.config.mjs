/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/eventApi/:path*',
        destination: `${process.env.NEXT_PUBLIC_EVENT_API_BASE_URL}/eventApi/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_RENTAL_API_BASE_URL}/api/:path*`,
      },
    ]
  },
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/image.village/**',
      },
    ],
  },
}

export default nextConfig
