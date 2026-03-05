// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // The specific one from your error
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh', // To allow the fallback avatars
      },
    ],
  },
};

export default nextConfig;