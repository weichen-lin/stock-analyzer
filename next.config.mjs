/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'financialmodelingprep.com',
        port: '',
        pathname: '/image-stock/**',
      },
    ],
  },
  transpilePackages: ['@mui/x-charts'],
}

export default nextConfig
