/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/eventApi/:path*',
        // destination: 'https://frontapi.bbillage.com:3232/eventApi/:path*',
        destination: 'http://3.37.157.86:3232/eventApi/:path*',
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
