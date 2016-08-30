import setRouterContext from './middleware/set-router-context';
import renderApp from './middleware/render-app';
import express from 'express';
import debug from 'debug';
import slashes from 'connect-slashes';

import apiRouter from './api';

const log = debug('lego:router');
const oneDay = 1000 * 60 * 60 * 24;
import { DIST } from '../config/paths';

export const routingApp = express();

routingApp.on('mount', (parent) => {
  parent.use((err, req, res, next) => (
    (err) ? res.render500(err) : next()
  ));
});

function getStaticAssets() {
  return (process.env.NODE_ENV === 'development')
    ? require('./middleware/hot-reload') // eslint-disable-line
    : express.static(DIST, { maxAge: oneDay });
}

export function setRoutes(assets) {
  log('adding react routes');

  routingApp
    .use(getStaticAssets())
    .use('/api', apiRouter)
    .use(slashes())
    .get('*', setRouterContext, renderApp(assets));
}
