import type { NextConfig } from "next";


 const nextConfig: NextConfig = {
 images: {
    domains: ["example.com"],
   remotePatterns: [
    {
        protocol: 'https',
        hostname: 'uploadthing.com',
        port: '',
        pathname: '/**',
    },
    {
 protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',


    },
   ], 
  },
  };


export default nextConfig;
