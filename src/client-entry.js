import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

import Root, { DevTools } from './app/Root';
import './styles/app.scss';

debug.enable(process.env.DEBUG);

const log = debug('lego:client-entry');
log('Client environment', process.env);

try {
  ReactDOM.render(<Root />, document.getElementById('html'));
  ReactDOM.render(<DevTools />, document.getElementById('devTools'));
} catch (err) {
  log('Render error', err);
}
