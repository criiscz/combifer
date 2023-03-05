/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
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
