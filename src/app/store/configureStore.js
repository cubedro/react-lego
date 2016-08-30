import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import promiseMiddleware from './promiseMiddleware';

const inBrowser = typeof window === 'object';
const middleware = [
  thunk,
  promiseMiddleware,
  createLogger({
    predicate: () => inBrowser && process.env.NODE_ENV !== 'production',
    collapsed: true
  })
];

export default function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
  );
}
