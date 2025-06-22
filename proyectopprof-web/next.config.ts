import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // Necessary to deploy in Deno deploy
};

export default nextConfig;
