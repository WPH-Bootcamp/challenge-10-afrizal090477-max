import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'logos-world.net',
        pathname: '/**',
      }
    ],
  },
  
  async rewrites() {
    return [
      {
        source: '/api-backend/:path*',
        destination: 'https://be-restaurant-production.up.railway.app/:path*',
      },
    ];
  },
};

export default nextConfig;