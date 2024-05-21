const path = require('path');
/**
 * Autoogenerated using npx @sentry/wizard -i nextjs
 */
const { defaultHeaders } = require('./config/headers');


const moduleExports = {
  
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
  },
  // required to prevent sentry from crashing next server
  outputFileTracing: false,
  images: {
    domains: [
      'images.unsplash.com',
      'icon.horse',
      'logo.clearbit.com',
      'flagcdn.com',
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    });

    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: defaultHeaders,
      },
    ];
  },
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports
