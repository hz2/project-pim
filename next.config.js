/** @type {import('next').NextConfig} */


module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: 'custom'
  },
  exportPathMap: async function (
    defaultPathMap, {
      dev,
      dir,
      outDir,
      distDir,
      buildId
    }
  ) {
    return {
      '/': {
        page: '/'
      },
      ...defaultPathMap,
      // '/about': {
      //   page: '/about'
      // },
      // '/p/hello-nextjs': {
      //   page: '/post',
      //   query: {
      //     title: 'hello-nextjs'
      //   }
      // },
    }
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};