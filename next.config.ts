import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // 配置基础路径，用于部署到 /gallery 子路径
  basePath: isProduction ? '/gallery' : '',
  // 确保静态资源路径正确
  assetPrefix: isProduction ? '/gallery' : '',
};

export default nextConfig;
