/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' https://concertify.netlify.app; img-src 'self' data: https://storage.googleapis.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; font-src 'self' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline'",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(); battery=(self); geolocation=(); microphone=('https://a-domain.com')",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = {
  async redirects() {
    return [
      {
        source: "/_headers",
        destination: "/_headers",
        permanent: true,
      },
    ];
  },
  ...nextConfig,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};
