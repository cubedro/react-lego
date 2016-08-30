import webpack from 'webpack';
import express from 'express';
import webpackMiddleware from 'webpack-dev-middleware';
import debug from 'debug';

import webpackConfig from '../../config/webpack.config.dev.babel';

const log = {
  pack: debug('webpack'),
  hot: debug('hot-reload')
};

const compiler = webpack(webpackConfig);

const hotRouter = new express.Router();

hotRouter.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    reasons: false
  }
}));

hotRouter.use(require('webpack-hot-middleware')(compiler, {
  log: log.pack,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

export default hotRouter;
