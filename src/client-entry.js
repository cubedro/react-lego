import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import { AppContainer } from 'react-hot-loader';

import Root from './app/Root';
import './styles/app.scss';

debug.enable(process.env.DEBUG);

const log = debug('lego:client-entry');
log('Client environment', process.env);

const rootEl = document.getElementById('html');
export const App = (
  <AppContainer>
    <Root />
  </AppContainer>
);

try {
  ReactDOM.render(App, rootEl);
  if (module.hot) {
    module.hot.accept('./app/Root', () => {
      const NextApp = require('./app/Root').default; // eslint-disable-line
      ReactDOM.render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        rootEl
      );
    });
  }
} catch (err) {
  log('Render error', err);
}
