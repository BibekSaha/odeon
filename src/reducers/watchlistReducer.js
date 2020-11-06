import { ADD_TO_WATCHLIST, INITIAL_ADD_TO_WATCHLIST, RESET } from '../actions/types';

export default (state={}, action) => {
  switch (action.type) {
    case ADD_TO_WATCHLIST:
      return { ...state, [action.payload.props.id]: action.payload };
    case INITIAL_ADD_TO_WATCHLIST:
      return action.payload;
      // return { ...state, ...action.payload };
    case RESET:
      return {};
    default:
      return state;
  }
}