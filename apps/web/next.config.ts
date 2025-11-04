import NextBundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import webpack from "webpack";

import packageJson from "./package.json" with { type: "json" };

const CESIUM_VERSION = packageJson.dependencies.cesium.replace(/^[\^~]/, "");
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
      },
    },
  },
  output: "standalone",
  // outputFileTracingIncludes: {
  //   "/**/*": [
  //     "../../node_modules/.pnpm/@prisma+client@*/node_modules/.prisma/client/*.node",
  //     "../../node_modules/.pnpm/@prisma+client@*/node_modules/.prisma/client/*.so.node",
  //   ],
  // },
  // Explicitly mark Prisma as server-side external package for Turbopack
  serverExternalPackages: ["@prisma/client", "@prisma/engines"],
  experimental: {
    // externalDir: true,
    // The serverActions value needs to be an object, not a boolean
    serverActions: {
      allowedOrigins: ["*"],
    },
    optimizePackageImports: ["lucide-react"],
  },
  transpilePackages: [
    "@juun/ui",
    "@config/eslint",
    "@config/tailwind",
    "@config/typescript",
  ],

  // webpack configuration
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
