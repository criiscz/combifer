/** @type {{images: {remotePatterns: [{protocol: string, hostname: string, port: string, pathname: string}], formats: (string)[]}, experimental: {appDir: boolean}}} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/avif', 'image/webp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.sfu.ca/',
        port: '',
        pathname: '/siat/**',
      },
    ]
  }
  // redirects: async () => {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/login', // Proxy to Backend
  //       permanent: false,
  //     },
  //   ]
  // }
}

module.exports = nextConfig
