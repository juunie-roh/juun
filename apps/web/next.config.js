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
    // externalDir: true,
    // The serverActions value needs to be an object, not a boolean
    serverActions: {
      allowedOrigins: ['*'],
    },
    optimizePackageImports: ['lucide-react'],
  },
  transpilePackages: ['@pkg/ui', '@pkg/config'],
};

const analyze = process.env.ANALYZE === 'true';
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: analyze,
});

export default analyze ? withBundleAnalyzer(nextConfig) : nextConfig;
