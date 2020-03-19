const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@Components': path.resolve(__dirname, 'src/presentation/components'),
      '@': path.resolve(__dirname, 'src'),
    },
  };
  return config;
};
