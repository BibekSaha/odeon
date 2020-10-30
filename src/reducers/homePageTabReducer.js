import {
  TRENDING_MOVIES_TAB,
  POPULAR_MOVIES_TAB,
  TOP_RATED_MOVIES_TAB,
  DRAMA_MOVIES_TAB,
  MYSTERY_MOVIES_TAB,
  TRENDING_TV_TAB,
  POPULAR_TV_TAB,
  TOP_RATED_TV_TAB,
  NETFLIX_TV_TAB,
  AMAZON_TV_TAB
} from '../actions/types';

const DEFAULT_TABS = {
  type: 'movie',
  currentTab: TRENDING_MOVIES_TAB,
};

export default (state = DEFAULT_TABS, action) => {
  switch (action.type) {
    case TRENDING_MOVIES_TAB:
    case POPULAR_MOVIES_TAB:
    case TOP_RATED_MOVIES_TAB:
    case DRAMA_MOVIES_TAB:
    case MYSTERY_MOVIES_TAB:
      return { ...state, type: 'movie', currentTab: action.type };
    case TRENDING_TV_TAB:
    case POPULAR_TV_TAB:
    case TOP_RATED_TV_TAB:
    case NETFLIX_TV_TAB:
    case AMAZON_TV_TAB:
      return { ...state, type: 'tv', currentTab: action.type };
    default:
      return state;
  }
};
