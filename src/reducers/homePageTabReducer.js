import { TRENDING_MOVIES_TAB, POPULAR_MOVIES_TAB } from '../actions/types';

const DEFAULT_TABS = {
  type: 'movie',
  currentTab: TRENDING_MOVIES_TAB
};

export default (state=DEFAULT_TABS, action) => {
  switch (action.type) {
    case TRENDING_MOVIES_TAB:
    case POPULAR_MOVIES_TAB:
      return { ...state, currentTab: action.type }
    default:
      return state;
  }
}