/** @type {import('next').NextConfig} */


module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: 'imgix',
    path: '',
  },
  // images: {
  //   loader: 'custom'
  // },
  // images: {
  //   loader: "imgix",
  //   path: "https://noop/",
  // },
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