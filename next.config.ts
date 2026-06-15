import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Mengizinkan semua akses folder gambar dari Cloudinary backend lo
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Jaga-jaga untuk gambar fallback unspash kita
      }
    ],
  },
};

export default nextConfig;