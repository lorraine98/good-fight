/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/nickname:path*",
        destination: "https://nickname.hwanmoo.kr/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
