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
  typescript:{
    tsconfigPath:'tsconfig.build.json'
  }
};

export default nextConfig;
