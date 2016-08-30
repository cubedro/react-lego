import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { makeRoutes } from './routes';
import configureStore from './store/configureStore';
import { isBrowser } from './utils';
import debug from 'debug';

debug('lego:Root');

// exported to be used in tests
export const history = isBrowser ? browserHistory : createMemoryHistory();
export const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line
const reduxHistory = syncHistoryWithStore(history, store);

const RootEnv = (process.env.NODE_ENV !== 'production')
  ? require('./containers/DevTools/DevTools')
  : () => (<span />);

export const DevTools = () => (<Provider store={store} ><RootEnv /></Provider>);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={reduxHistory} routes={makeRoutes()} />
      </Provider>
    );
  }
}
