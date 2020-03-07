require('dotenv').config();
const path = require('path');

const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/styles/settings/index.css'),
        path.resolve(__dirname, './src/assets/styles/tools/index.css')
      ]
    });
};

const postcssPlugins = [
  require('postcss-import'),
  require('postcss-nested'),
  require('postcss-calc'),
  require('postcss-pxtorem')({
    propWhiteList: []
  }),
  require('postcss-preset-env')({
    autoprefixer: {
      grid: true
    },
    preserve: false,
    stage: 1,
    features: {
      'focus-within-pseudo-class': false
    }
  }),
  require('postcss-focus-within'),
  require('postcss-remove-root'),
  require('postcss-reporter')({
    clearReportedMessages: true
  }),
  require('cssnano')({
    preset: [
      'default',
      {
        discardComments: {
          removeAll: true
        }
      }
    ]
  })
];

module.exports = {
  siteName: 'Co-op',
  plugins: [
    {
      use: '@gridsome/source-contentful',
      options: {
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN_PUBLISHED,
        host: 'cdn.contentful.com',
        environment: process.env.CONTENTFUL_ENVIRONMENT,
        typeName: 'Contentful'
      }
    },
    {
      use: 'gridsome-plugin-purgecss'
    }
  ],
  configureWebpack: {},
  chainWebpack(config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => {
      addStyleResource(config.module.rule('css').oneOf(type));
    });
    config.module
      .rule('postcss-loader')
      .test(/\.css$/)
      .use(postcssPlugins)
      .loader('postcss-loader');
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...postcssPlugins);
        return options;
      });
    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')
      .options({
        removeAttributes: ['width', 'height', 'alt', 'src'],
        addAttributes: {
          focusable: false,
          tabindex: false
        }
      });
  }
};
