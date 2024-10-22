/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Home',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
