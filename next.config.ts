import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 기존 Webpack 설정도 유지 (하위 호환성)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;