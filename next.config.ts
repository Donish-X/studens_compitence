import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/electronic-journal',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
