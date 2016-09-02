const IsomorphicTools = require('webpack-isomorphic-tools');
const IsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const isomorphicConfig = require('../config/isoConfig.js');
const paths = require('../config/paths');

const isDevelopment = process.env.NODE_ENV === 'development';
const isomorphicTools = new IsomorphicTools(isomorphicConfig);
const isomorphicPlugin = new IsomorphicToolsPlugin(isomorphicConfig);

module.exports = {
  server() {
    return isomorphicTools.development(isDevelopment)
      .server(paths.ROOT)
      .then(() => {
        const assets = isomorphicTools.assets();
        return {
          javascript: Object.keys(assets.javascript).map((asset, i) => assets.javascript[asset]),
          styles: Object.keys(assets.styles).map((asset, i) => assets.styles[asset])
        }
      });
  },
  plugin: () => isomorphicPlugin.development(isDevelopment)
};
