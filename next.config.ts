import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-lib'],
  },
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      sharp: 'commonjs sharp',
      canvas: 'commonjs canvas',
    });
    return config;
  },
};

export default nextConfig;
