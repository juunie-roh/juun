/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // output: 'standalone',
  experimental: {
    // The serverActions value needs to be an object, not a boolean
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
};

export default nextConfig;
