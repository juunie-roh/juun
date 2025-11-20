import NextBundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import webpack from "webpack";

import packageJson from "./package.json" with { type: "json" };

// get cesium version from the project's package.json
const CESIUM_VERSION = packageJson.dependencies.cesium.replace(/^[\^~]/, "");
// use Cesium's official CDN URL with specified version dynamically
const CESIUM_BASE_URL = `https://cdn.jsdelivr.net/npm/cesium@${CESIUM_VERSION}/Build/Cesium/`;

const nextConfig: NextConfig = {
  env: {
    CESIUM_BASE_URL,
  },

  // turbopack configuration
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  output: "standalone",
  // Explicitly mark Prisma as server-side external package for Turbopack
  serverExternalPackages: ["@prisma/client", "@prisma/engines"],
  experimental: {
    // externalDir: true,
    // serverActions: {
    //   allowedOrigins: ["*"],
    // },
    optimizePackageImports: ["lucide-react"],
  },
  transpilePackages: ["@juun/ui", "@juun/api", "@juun/db"],
  // support old blog slug-based urls redirect to new id-based urls
  redirects() {
    return [
      {
        source: "/blog/yarn-berry",
        destination: "/blog/1",
        permanent: true,
      },
      {
        source: "/blog/npm-packages",
        destination: "/blog/2",
        permanent: true,
      },
      {
        source: "/blog/docker-image-optimization",
        destination: "/blog/3",
        permanent: true,
      },
      {
        source: "/blog/cloud-native",
        destination: "/blog/4",
        permanent: true,
      },
      {
        source: "/blog/bundle-optimization",
        destination: "/blog/5",
        permanent: true,
      },
      {
        source: "/blog/micro-frontend",
        destination: "/blog/6",
        permanent: true,
      },
      {
        source: "/blog/separation-of-concerns",
        destination: "/blog/7",
        permanent: true,
      },
    ];
  },

  // webpack configuration, for explicit webpack build (with --webpack)
  webpack(config, options) {
    // svg loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = { fs: false };

    // cesium assets using official cdn
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify(CESIUM_BASE_URL),
      }),
    );

    // sourcemap settings (webpack only)
    // Development: uses default sourcemaps
    // Production: disabled for security and performance
    if (!options.dev) {
      config.devtool = false;
    }

    return config;
  },
};

const analyze = process.env.ANALYZE === "true";
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: analyze,
});

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/ko.json",
  },
});

export default withBundleAnalyzer(withNextIntl(nextConfig));
