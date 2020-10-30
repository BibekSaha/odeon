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
} from './types';

export const trendingMoviesTabAction = () => ({ type: TRENDING_MOVIES_TAB });
export const popularMoviesTabAction = () => ({ type: POPULAR_MOVIES_TAB });
export const topRatedMoviesTabAction = () => ({ type: TOP_RATED_MOVIES_TAB });
export const dramaMoviesTabAction = () => ({ type: DRAMA_MOVIES_TAB });
export const mysteryMoviesTabAction = () => ({ type: MYSTERY_MOVIES_TAB });

export const trendingTvTabAction = () => ({ type: TRENDING_TV_TAB });
export const popularTvTabAction = () => ({ type: POPULAR_TV_TAB });
export const topRatedTvTabAction = () => ({ type: TOP_RATED_TV_TAB });
export const netflixTVTabAction = () => ({ type: NETFLIX_TV_TAB });
export const amazonTvTabAction = () => ({ type: AMAZON_TV_TAB });