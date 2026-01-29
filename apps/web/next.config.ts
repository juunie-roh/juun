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
  serverExternalPackages: ["prisma"],
  experimental: {
    // externalDir: true,
    // serverActions: {
    //   allowedOrigins: ["*"],
    // },
    optimizePackageImports: ["lucide-react"],
  },
  cacheComponents: true,
  reactCompiler: true,
  // no longer needed since each packages are pre-built
  // transpilePackages: ["@juun/api", "@juun/db"],
  // support old blog slug-based urls redirect to new id-based urls
  redirects() {
    return [
      {
        source: "/blog/yarn-berry",
        destination: "/ko/blog/1",
        permanent: true,
      },
      {
        source: "/blog/npm-packages",
        destination: "/ko/blog/2",
        permanent: true,
      },
      {
        source: "/blog/docker-image-optimization",
        destination: "/ko/blog/3",
        permanent: true,
      },
      {
        source: "/blog/cloud-native",
        destination: "/ko/blog/4",
        permanent: true,
      },
      {
        source: "/blog/bundle-optimization",
        destination: "/ko/blog/5",
        permanent: true,
      },
      {
        source: "/blog/micro-frontend",
        destination: "/ko/blog/6",
        permanent: true,
      },
      {
        source: "/blog/separation-of-concerns",
        destination: "/ko/blog/7",
        permanent: true,
      },
    ];
  },
  // rewrite paths with i18n wrapped link for static html pages
  rewrites() {
    return [
      { source: "/ko/100days/:path*", destination: "/100days/:path*" },
      { source: "/en/100days/:path*", destination: "/100days/:path*" },
    ];
  },
  // Security Headers
  // @see https://owasp.org/www-project-secure-headers/
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevents click-jacking by blocking iframe embedding
          { key: "X-Frame-Options", value: "DENY" },
          // Prevents MIME-sniffing attacks (browser won't guess content types)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Controls referrer info sent to other sites (balances privacy/functionality)
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restricts browser features (camera, mic, location) from being accessed
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Forces HTTPS for 2 years, includes subdomains, allows HSTS preload list
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Content Security Policy - restricts resource loading to mitigate XSS
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'", // Default: only same-origin resources
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://vercel.live https://*.vercel.live https://va.vercel-scripts.com", // Scripts: self + Cesium CDN + Vercel toolbar + Vercel Analytics
              "style-src 'self' 'unsafe-inline'", // Styles: self + inline (Tailwind)
              "img-src 'self' data: https:", // Images: self + data URIs + any HTTPS
              "font-src 'self' data:", // Fonts: self + data URIs
              "connect-src 'self' https://vercel.live https://*.vercel.live wss://vercel.live wss://*.vercel.live https://cdn.jsdelivr.net https://api.cesium.com https://*.virtualearth.net http://*.virtualearth.net https://assets.ion.cesium.com/", // XHR/WebSocket: self + Vercel + Cesium CDN + Cesium API + Bing Maps (HTTP for tiles)
              "worker-src 'self' blob: https://cdn.jsdelivr.net", // Web Workers: self + blob URLs + Cesium CDN workers
              "frame-src https://vercel.live https://*.vercel.live", // Iframes: Vercel toolbar
              "frame-ancestors 'none'", // Prevents embedding in iframes (like X-Frame-Options)
            ].join("; "),
          },
        ],
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
