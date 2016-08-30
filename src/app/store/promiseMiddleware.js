import debug from 'debug';

const log = debug('lego:promiseMiddleware');
const status = {
  isLoading: false,
  isTimeout: false,
  isError: false,
};

function delay(time) {
  return new Promise((fulfill) => setTimeout(fulfill, time));
}

export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, timeoutMs = 15000, ...rest } = action;
    log('FETCH with promise', !!promise);

    if (!promise) return next(action);

    const SUCCESS = type;
    const FETCH = `${type}_FETCH`;
    const FAILURE = `${type}_FETCH_FAILURE`;
    const TIMEOUT = `${type}_FETCH_TIMEOUT`;

    next({ ...rest, status: { ...status, isLoading: true }, type: FETCH });

    const fetchData = promise
      .then(data => {
        const response = { ...rest, status, data, type: SUCCESS };
        log('SUCCESS');
        next(response);
        return response;
      })
      .catch(error => {
        const response = { ...rest, status: { ...status, isError: true }, error, type: FAILURE };
        log('FAILURE', error);
        next(response);
        return response;
      });

    const dataTimeout = delay(timeoutMs).then(() => {
      log('TIMEOUT');
      next({ ...rest, status: { ...status, isTimeout: true }, type: TIMEOUT });
    });

    return Promise.race([fetchData, dataTimeout])
      .then((response) => response.data, reason => log(reason));
  };
}
