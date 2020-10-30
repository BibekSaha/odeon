import { ADD_TO_WATCHLIST, CLEAR_WATCHLIST, INITIAL_ADD_TO_WATCHLIST } from './types';

export default ({ id, timestamp }) => {
  return {
    type: ADD_TO_WATCHLIST,
    payload: {id, timestamp}
  };
};

export const initAddToWatchlist = (watchlist) => {
  return {
    type: INITIAL_ADD_TO_WATCHLIST,
    payload: watchlist
  };
};

export const clearWatchlist = () => {
  return {
    type: CLEAR_WATCHLIST
  };
};