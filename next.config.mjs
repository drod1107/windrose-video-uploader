/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'embed-ssl.wistia.com',
        port: '',
        pathname: '/deliveries/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/wistia-upload',
        destination: 'https://upload.wistia.com/',
      },
    ];
  },
};

export default nextConfig;
