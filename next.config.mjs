/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cdn.sanity.io'], // Add this to allow images from Sanity
    },
  };
  
  export default nextConfig;
  