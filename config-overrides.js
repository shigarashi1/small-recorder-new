const path = require('path');

module.exports = (config, env) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@Components': path.resolve(__dirname, './src/presentation/components'),
      '@': path.resolve(__dirname, './src'),
    },
  };
};
