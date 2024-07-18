/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/eventApi/:path*',
        destination: 'https://frontapi.bbillage.com:3232/eventApi/:path*',
      },
    ];
  },
  trailingSlash: true,
};

export default nextConfig;
