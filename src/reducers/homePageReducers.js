import { TRENDING_MOVIES, POPULAR_MOVIES } from '../actions/types';

const DEFAULT_TRENDING_MOVIES = { totalPages: 0, currentPage: 0, results: [] };

export const trendingMoviesReducer = (state=DEFAULT_TRENDING_MOVIES, action) => {
  switch (action.type) {
    case TRENDING_MOVIES:
      return {...state, ...action.payload}
    default: 
      return state;
  }
};

const DEFAULT_POPULAR_MOVIES = { totalPages: 0, currentPage: 0, results: [] };

export const popularMoviesReducer = (state=DEFAULT_POPULAR_MOVIES, action) => {
  switch (action.type) { 
    case POPULAR_MOVIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};