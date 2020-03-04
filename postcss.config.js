module.exports = () => ({
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-calc': {},
    'postcss-pxtorem': {
      propWhiteList: [],
    },
    'postcss-preset-env': {
      autoprefixer: {
        grid: true,
      },
      preserve: false,
      // https://cssdb.org/#staging-process
      stage: 1,
      features: {
        'focus-within-pseudo-class': false,
      },
    },
    'postcss-focus-within': {},
    'postcss-remove-root': {},
    'postcss-reporter': {
      clearReportedMessages: true,
    },
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    },
  },
});
