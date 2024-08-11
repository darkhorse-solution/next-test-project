/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dummyimage.com", "s3-alpha-sig.figma.com", "cdn4.iconfinder.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10g',
    },
  },
};

export default nextConfig;
