/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // Preserve existing routes
      {
        source: '/pages/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/pages/terms.html',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/pages/privacy.html',
        destination: '/privacy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
