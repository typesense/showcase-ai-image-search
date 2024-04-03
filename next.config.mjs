/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ai-image-search-images.typesense.org',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
