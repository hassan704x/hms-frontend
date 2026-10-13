// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  // Add other configurations here
};

export default nextConfig;
