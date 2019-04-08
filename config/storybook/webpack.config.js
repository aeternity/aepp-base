/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["config"] }] */

module.exports = (config) => {
  config.resolve.alias['../observables'] = '../__mocks__/observables';

  return config;
};
