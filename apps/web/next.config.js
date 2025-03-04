import NextBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.resolve.fallback = { fs: false };

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  experimental: {
    // The serverActions value needs to be an object, not a boolean
    serverActions: {
      allowedOrigins: ['*'],
    },
    optimizePackageImports: ['lucide-react'],
  },
  transpilePackages: ['@juun/ui', '@juun/config'],
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
