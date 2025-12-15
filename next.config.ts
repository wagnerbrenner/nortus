import type { NextConfig } from "next";
import i18nextConfig from "./next-i18next.config";

const i18n = i18nextConfig.i18n;

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n,
};

export default nextConfig;
