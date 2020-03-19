/* eslint-disable */
const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      "@Components": path.resolve(__dirname, "src/presentation/components"),
      "@Events": path.resolve(__dirname, "src/presentation/events"),
      "@DomainModels": path.resolve(__dirname, "src/domain/models"),
      "@": path.resolve(__dirname, "src")
    }
  };
  return config;
};
