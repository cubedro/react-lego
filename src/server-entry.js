require('babel-core/register')({
  only: [/tests/, /src/, /config/]
});
require('babel-polyfill');
require('./config/environment');

const debug = require('debug');
const isoTools = require('./server/isomorphic.tools');
const hook = require('node-hook').hook;
const log = debug('lego: server-entry');
hook('.scss', () => '');

isoTools.server()
  .then((assets) => {
    // important! this require must come after the isoTools server has started
    const createServer = require('./server/server'); //eslint-disable-line
    return createServer(assets);
  })
  .then((server) => {
    server.listen(process.env.PORT, () => {
      console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
    });
  })
  .catch(e => log(e));
