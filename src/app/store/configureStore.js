import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import DevTools from '../containers/DevTools/DevTools';
import { persistState } from 'redux-devtools';

const inBrowser = typeof window === 'object';
const middleware = [
  thunk,
  createLogger({
    predicate: () => inBrowser && process.env.NODE_ENV !== 'production',
    collapsed: true
  })
];

function getSessionKey() {
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

const enhancer = (inBrowser && process.env.NODE_ENV !== 'production')
  ? compose(applyMiddleware(...middleware), DevTools.instrument(), persistState(getSessionKey()))
  : compose(applyMiddleware(...middleware));

export default function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    enhancer
  );
}
