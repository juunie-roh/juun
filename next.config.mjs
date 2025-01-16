import NextMDX from '@next/mdx';
import NextBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

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
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const withMDX = NextMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
})

export default withBundleAnalyzer(withMDX(nextConfig));
