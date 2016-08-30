import api from '../api';
import { randomRange } from '../utils';

export const FETCH_PEOPLE_CARDS = 'FETCH_PEOPLE_CARDS';
export const FETCH_PEOPLE_CARDS_SUCCESS = 'FETCH_PEOPLE_CARDS_SUCCESS';
const DECK = 87;

export function loginSuccess(data) {
  return dispatch => {
    dispatch({ data, type: FETCH_PEOPLE_CARDS_SUCCESS });
  };
}

export function fetchPeopleCards() {
  const cards = randomRange(1, DECK, 2);
  return dispatch => api.fetchCards('people', cards)
    .then(data => dispatch(loginSuccess(data)));
}
