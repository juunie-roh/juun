import type { NextConfig } from "next";
import { DefinePlugin } from "webpack";

import packageJson from "./package.json" with { type: "json" };

const cesiumVersion = packageJson.dependencies.cesium.replace(/^[\^~]/, "");

const nextConfig: NextConfig = {
  // Link zones
  basePath: "/multi-zone",
  // Webpack configurations
  webpack: (config, options) => {
    // svg loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = { fs: false };

    // cesium assets using official cdn
    config.plugins.push(
      new DefinePlugin({
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
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
