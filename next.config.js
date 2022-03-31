/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/front',
        permanent: false,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};