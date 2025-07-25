import NextBundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";
import webpack from "webpack";

import packageJson from "./package.json" with { type: "json" };

const cesiumVersion = packageJson.dependencies.cesium.replace(/^[\^~]/, "");

const nextConfig: NextConfig = {
  // turbopack configuration (unused)
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
      },
    },
  },

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
        CESIUM_BASE_URL: JSON.stringify(
          `https://cdn.jsdelivr.net/npm/cesium@${cesiumVersion}/Build/Cesium/`,
        ),
      }),
    );

    // sourcemap settings
    if (!options.dev) {
      config.devtool = options.isServer
        ? false
        : "eval-cheap-module-source-map";
    }

    return config;
  },
  // disable lint check on build
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  experimental: {
    // externalDir: true,
    // The serverActions value needs to be an object, not a boolean
    serverActions: {
      allowedOrigins: ["*"],
    },
    optimizePackageImports: ["lucide-react"],
  },
  transpilePackages: ["@pkg/ui", "@pkg/config"],
};

const analyze = process.env.ANALYZE === "true";
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: analyze,
});

export default analyze ? withBundleAnalyzer(nextConfig) : nextConfig;
