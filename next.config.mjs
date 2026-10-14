/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'ts'],
  experimental: {
    proxyClientMaxBodySize: '15mb',
  },
};

export default nextConfig;

