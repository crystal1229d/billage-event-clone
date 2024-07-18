/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/events',
        destination:
          'https://frontapi.bbillage.com:3232/eventApi/event/:size/:page',
      },
      {
        source: '/api/event/:id',
        destination: 'https://frontapi.bbillage.com:3232/eventApi/event/:id',
      },
    ]
  },
}

export default nextConfig
